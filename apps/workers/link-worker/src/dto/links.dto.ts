export type CreateLinkRequestDto = {
  value: string;
}

export type GetLinkRequestDto = {
  key: string;
}

export type CreateLinkResponseDto = {
  status: string;
  link: string;
  key: string;
}

export type GetLinkResponseDto = {
  status: string;
  value: string;
  key: string;
}