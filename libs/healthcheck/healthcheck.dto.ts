type Req = {
  url: string;
  method: string;
};

type Res = {
  status: string;
  code: number;
}

export type Options = {
  name: string;
  host: string;
  req: Req;
};

export type Response = {
  name: string;
  host: string;
  res: Res;
  req: Req;
  time: number;
  date: string;
}