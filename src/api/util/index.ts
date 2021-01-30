import * as admin from 'firebase-admin';
import firebase from 'firebase';

export const deleteCollections = async (
  collections: FirebaseFirestore.CollectionReference<FirebaseFirestore.DocumentData>[],
): Promise<void> => {
  await Promise.all(
    collections.map(async coll => {
      // Get a new write batch
      const batch = admin.firestore().batch();
      const documents = await coll.listDocuments();

      await Promise.all(
        documents.map(async doc => {
          await deleteCollections(await doc.listCollections());
          batch.delete(doc);
        }),
      );
      await batch.commit();
    }),
  );
};

/**
 * deletes all firestore collection using the admin api
 * @return current no of collection after delete
 */
export const deleteAllFirestoreCollection = async (): Promise<number> => {
  const db = admin.firestore();
  const collections = await db.listCollections();

  await deleteCollections(collections);
  const newCollections = await admin.firestore().listCollections();

  return newCollections.length;
};

/**
 * delete all user of firebase auth using the admin api
 * @return current user size after delete
 */
export const deleteAllUser = async (): Promise<number> => {
  // user needs to logout or jest will not able to finish test.
  // i think it's happening because firebase keeps an active connection to the
  // sever and doesn't close the connection.
  // so we have to manually close the connection by logging out.
  await firebase.auth().signOut();

  const { users } = await admin.auth().listUsers();

  await Promise.all(
    users.map(async user => {
      await admin.auth().deleteUser(user.uid);
    }),
  );
  const { users: newUsers } = await admin.auth().listUsers();

  return newUsers.length;
};

export const initAdminSdkForTest = (): void => {
  process.env.FIREBASE_AUTH_EMULATOR_HOST = 'localhost:9099';
  process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';

  admin.initializeApp({
    projectId: 'attenda-6c9ad',
  });
};

export default {};
