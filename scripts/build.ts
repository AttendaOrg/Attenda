import * as admin from 'firebase-admin';
import * as fs from 'fs';
import * as process from 'process';
import * as glob from 'glob';
import * as cliProgress from 'cli-progress';
import TeacherApi, { teacherApi } from '../src/api/TeacherApi';
import { deleteCollections, initAdminSdkForTest } from '../src/api/util';
import { base64Encode } from '../src/util';

initAdminSdkForTest();

const base64EncodeSvg = (data: string): string =>
  `data:image/svg+xml;base64,${base64Encode(data)}`;

const main = async () => {
  const batch = admin.firestore().batch();
  const documents = await admin
    .firestore()
    .collection(TeacherApi.CLASS_CARD_ICONS_COLLECTION_NAME)
    .listDocuments();
  const deleteProgress = new cliProgress.SingleBar(
    {},
    cliProgress.Presets.rect,
  );
  const insertProgress = new cliProgress.SingleBar(
    {},
    cliProgress.Presets.rect,
  );

  console.log(`[*] all document size ${documents.length}`);
  deleteProgress.start(documents.length ?? 0, 0);

  await Promise.all(
    documents.map(async doc => {
      deleteProgress.increment();
      await deleteCollections(await doc.listCollections());
      batch.delete(doc);
    }),
  );
  await batch.commit();
  deleteProgress.stop();
  let i = 0;

  glob('./Icons/**/*.svg', async (err, files) => {
    if (!err) {
      insertProgress.start(files.length ?? 0, 0);
      await Promise.all(
        files.map(file =>
          fs.readFile(file, async (err2, data) => {
            if (!err2) {
              const [, , category, fileName] = file.split('/');
              const [name] = fileName.split('.svg');

              await teacherApi.createClassCardIcons(
                name,
                base64EncodeSvg(data.toString()),
                category,
              );
              insertProgress.increment();
              i += 1;
              if (i === files.length) {
                insertProgress.stop();
                process.exit();
              }
            }
          }),
        ),
      );
    }
  });

  // console.log(f.docs.length);
};

main();
