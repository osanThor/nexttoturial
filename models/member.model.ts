import { InAuthuser } from './in_auth_user';
import FirebaseAdmin from '@/models/firebase_admin';

const MEMBER_COL = 'members';
const SCR_NAME_COL = 'screen_name';

type AddResult = { result: true; id: string } | { result: false; message: string };

async function add({ uid, displayName, email, photoURL }: InAuthuser): Promise<AddResult> {
  try {
    const screenName = (email as string).replace('@gmail.con', '');
    const addResult = await FirebaseAdmin.getInstance().Firebase.runTransaction(async (transaction) => {
      const memberRef = FirebaseAdmin.getInstance().Firebase.collection(MEMBER_COL).doc(uid);
      const screenRef = FirebaseAdmin.getInstance().Firebase.collection(SCR_NAME_COL).doc(screenName);
      const memberDoc = await transaction.get(memberRef);
      if (memberDoc.exists) {
        // 이미 추가된 상태
        return false;
      }
      const addData = {
        uid,
        email: email ?? '',
        displayName: displayName ?? '',
        photoURL: photoURL ?? '',
      };
      await transaction.set(memberRef, addData);
      await transaction.set(screenRef, addData);
      return true;
    });
    if (addResult === false) {
      return { result: true, id: uid };
    }
    return { result: true, id: uid };
  } catch (e) {
    console.error(e);
    return { result: false, message: '서버 에러' };
  }
}

const MemberModel = {
  add,
};
export default MemberModel;
