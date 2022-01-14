import { useState } from 'react';

import { ADMIN_BASE_URL } from '../plugins/axios';
import { LoginRes } from '../types';
import cookie from './cookie';

type attachmentType = 'profile' | 'logos';

const imageCache: Record<string, { attachmentId: string; image: string }> = {};

export async function getImage(attachmentId: string, key: string, type: attachmentType) {
  if (key in imageCache) return Promise.resolve(imageCache[key].image);

  return await fetchAndCache(attachmentId, key, type);
}

export async function invalidateCacheImage(attachmentId: string, key: string) {
  return await fetchAndCache(attachmentId, key, 'profile');
}

async function fetchAndCache(attachmentId: string, key: string, type: attachmentType) {
  if (!attachmentId) return;

  const token = cookie.getCookie('jwt_info');
  // when request is open no need to add bearer token

  // eslint-disable-next-line no-undef
  const headers: HeadersInit = {};

  if (token) {
    const jwtInfo: LoginRes = JSON.parse(token);
    headers['Authorization'] = `Bearer ${jwtInfo.token}`;
  }
  const res = await fetch(
    `${ADMIN_BASE_URL}/attachments/download/${type}/${attachmentId}`,
    {
      headers,
    },
  );

  const blob = await res.blob();

  const image = URL.createObjectURL(blob);
  imageCache[key] = { attachmentId, image };

  return image;
}

export const fileToBlob = async (file: File) =>
  new Blob([new Uint8Array(await file.arrayBuffer())], { type: file.type });

export function usePicture(
  attachmentId?: string,
  uniqueId?: string | number,
  defaultImage = '/images/fall_back_prof_pic.jpg',
  type: attachmentType = 'profile',
) {
  const [picture, setPicture] = useState(defaultImage);

  if (attachmentId && uniqueId) {
    getImage(attachmentId, uniqueId.toString(), type)
      .then((fileName) => setPicture(fileName || defaultImage))
      .catch((e) => console.error(e));
  }

  return picture;
}
