import { ADMIN_BASE_URL } from '../plugins/axios';
import { LoginRes } from '../types';
import cookie from './cookie';

const imageCache: Record<string, { attachmentId: string; image: string }> = {};

export async function getImage(attachmentId: string, key: string) {
  if (key in imageCache) return Promise.resolve(imageCache[key].image);

  return await fetchAndCache(attachmentId, key);
}

export async function invalidateCacheImage(attachmentId: string, key: string) {
  return await fetchAndCache(attachmentId, key);
}

async function fetchAndCache(attachmentId: string, key: string) {
  const token = cookie.getCookie('jwt_info');
  // when request is open no need to add bearer token

  // eslint-disable-next-line no-undef
  const headers: HeadersInit = {};

  if (token) {
    const jwtInfo: LoginRes = JSON.parse(token);
    headers['Authorization'] = `Bearer ${jwtInfo.token}`;
  }
  const res = await fetch(
    `${ADMIN_BASE_URL}/attachments/download/profile/${attachmentId}`,
    {
      headers,
    },
  );
  const blob = await res.blob();

  const image = URL.createObjectURL(blob);
  imageCache[key] = { attachmentId, image };

  return image;
}
