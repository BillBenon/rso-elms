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
  defaultImage = '/images/default-pic.png',
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

export const downloadFile = async (attachmentId: string) => {
  // eslint-disable-next-line no-undef
  const headers: HeadersInit = {};
  const token = cookie.getCookie('jwt_info');

  if (token) {
    const jwtInfo: LoginRes = JSON.parse(token);
    headers['Authorization'] = `Bearer ${jwtInfo.token}`;
  }

  const res = await fetch(`${ADMIN_BASE_URL}/attachments/download/${attachmentId}`, {
    headers,
  });

  const blob = await res.blob();

  // const file = URL.createObjectURL(blob);

  const url = window.URL.createObjectURL(new Blob([blob], { type: 'application/pdf' }));

  return url;
};

export const downloadPersonalDoc = async (
  filename: string,
  file_type: string,
  downloadPath: string,
) => {
  let appsType = ['doc', 'xlxs', 'pptx', 'pdf', 'docx'];
  // eslint-disable-next-line no-undef
  const headers: HeadersInit = {};
  const token = cookie.getCookie('jwt_info');
  const content_type = appsType.includes(file_type)
    ? `application/${file_type}`
    : `image/${file_type}`;

  if (token) {
    const jwtInfo: LoginRes = JSON.parse(token);
    headers['Authorization'] = `Bearer ${jwtInfo.token}`;
  }

  const res = await fetch(`${ADMIN_BASE_URL}${downloadPath}${filename}`, {
    headers,
  });
  console.log(res);
  const blob = await res.blob();

  // const file = URL.createObjectURL(blob);

  const url = window.URL.createObjectURL(new Blob([blob], { type: content_type }));

  return url;
};
