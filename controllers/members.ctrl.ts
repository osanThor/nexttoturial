import { NextApiRequest, NextApiResponse } from 'next';
import MemberModel from '@/models/member.model';
import BadReqError from './error/bad_request_error';

async function add(req: NextApiRequest, res: NextApiResponse) {
  const { uid, email, displayName, photoURL } = req.body;
  if (uid === undefined || uid === null) {
    throw new BadReqError('uid가 비어있습니다');
  }
  if (email === undefined || email === null) {
    throw new BadReqError('email이 비어있습니다');
  }

  const addResult = await MemberModel.add({ uid, email, displayName, photoURL });
  if (addResult.result === true) {
    return res.status(201).json(addResult);
  }
  res.status(500).json(addResult);
}

const MemberCtrl = {
  add,
};

export default MemberCtrl;
