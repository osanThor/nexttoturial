import { InAuthUser } from './in_auth_user';
import FirebaseAdmin from '@/models/firebase_admin';

const MEMBER_COL = 'members';
const SCR_NAME_COL = 'screen_name';

type AddResult = { result: true; id: string } | { result: false; message: string };

async function add({ uid, displayName, email, photoURL }: InAuthUser): Promise<AddResult> {
  try {
    const screenName = (email as string).replace('@gmail.com', '');
    const addResult = await FirebaseAdmin.getInstance().Firestore.runTransaction(async (transaction) => {
      const memberRef = FirebaseAdmin.getInstance().Firestore.collection(MEMBER_COL).doc(uid);
      const screenRef = FirebaseAdmin.getInstance().Firestore.collection(SCR_NAME_COL).doc(screenName);
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

async function findByScreenName(screenName: string): Promise<InAuthUser | null> {
  const memberRef = FirebaseAdmin.getInstance().Firestore.collection(SCR_NAME_COL).doc(screenName);

  const memberDoc = await memberRef.get();

  if (memberDoc.exists === false) {
    return null;
  }
  const data = memberDoc.data() as InAuthUser;
  return data;
}

const MemberModel = {
  add,
  findByScreenName,
};
export default MemberModel;
