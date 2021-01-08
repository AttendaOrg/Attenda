import * as admin from 'firebase-admin';

/**
 * deletes all firestore collection using the admin api
 * @return current no of collection after delete
 */
export const deleteAllFirestoreCollection = async (): Promise<number> => {
  const db = admin.firestore();
  const collections = await db.listCollections();

  await Promise.all(
    collections.map(async coll => {
      // Get a new write batch
      const batch = admin.firestore().batch();
      const documents = await coll.listDocuments();

      documents.forEach(doc => {
        batch.delete(doc);
      });
      await batch.commit();
    }),
  );
  const newCollections = await admin.firestore().listCollections();

  return newCollections.length;
};

/**
 * delete all user of firebase auth using the admin api
 * @return current user size after delete
 */
export const deleteAllUser = async (): Promise<number> => {
  const { users } = await admin.auth().listUsers();

  users.forEach(user => {
    admin.auth().deleteUser(user.uid);
  });
  const { users: newUsers } = await admin.auth().listUsers();

  return newUsers.length;
};

export default {};
