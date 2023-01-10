import { firestore } from 'firebase-admin';
import CustomServerError from '@/controllers/error/custom_server_error';
import FirebaseAdmin from '../firebase_admin';

const MEMER_COL = 'members';
const MSG_COL = 'messages';
const SCR_NAME_COL = 'screen_names';

const { Firestore } = FirebaseAdmin.getInstance();

async function post({
  uid,
  message,
  author,
}: {
  uid: string;
  message: string;
  author?: { displayName: string; photoURL?: string };
}) {
  const memberRef = Firestore.collection(MEMER_COL).doc(uid);
  await Firestore.runTransaction(async (transaction) => {
    const memberDoc = await transaction.get(memberRef);
    if (memberDoc.exists === false) {
      throw new CustomServerError({ statusCode: 400, message: '존재하지 않는 사용자' });
    }
    const newMemberRef = memberRef.collection(MSG_COL).doc();
    const newMessageBody: {
      message: string;
      createAt: firestore.FieldValue;
      author?: { displayName: string; photoURL?: string };
    } = {
      message,
      createAt: firestore.FieldValue.serverTimestamp(),
    };
    if (author !== undefined) {
      newMessageBody.author = author;
    }
    await transaction.set(newMemberRef, newMessageBody);
  });
}

const MessageModel = {
  post,
};

export default MessageModel;
