// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';
import MemberCtrl from '@/controllers/members.ctrl';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;
  const supporMethod = ['POST'];
  try {
    if (supporMethod.indexOf(method!) === -1) {
      //에러 반환
    }
    await MemberCtrl.add(req, res);
  } catch (err) {
    console.error(err);
    //에러 처리
  }
}
