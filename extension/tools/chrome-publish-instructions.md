Chrome Web Store automated publish (template)

1) Create a Google Cloud service account and download a JSON key (replace values in chrome-service-account-template.json).
   - Enable the "Chrome Web Store API" for the project.
   - Grant the service account the role "Service Account User" and any roles needed to call the API.

2) Obtain the extension ID (from Developer Dashboard) and place your zipped extension at extension/dist/chrome-extension.zip.

3) Use this sample Node script to upload and publish (requires node >=14).

Sample steps (quick):

npm install google-auth-library node-fetch --save

// sample-publish.js (fill SERVICE_ACCOUNT_PATH and EXTENSION_ID)
const fs=require('fs');
const {GoogleAuth}=require('google-auth-library');
const fetch=require('node-fetch');

async function main(){
  const SERVICE_ACCOUNT_PATH='./extension/tools/chrome-service-account-template.json';
  const EXTENSION_ID='REPLACE_WITH_EXTENSION_ID';
  const auth=new GoogleAuth({keyFilename:SERVICE_ACCOUNT_PATH, scopes:['https://www.googleapis.com/auth/chromewebstore']});
  const client=await auth.getClient();
  const tokenResponse=await client.getAccessToken();
  const token=tokenResponse.token || tokenResponse;

  // Upload
  const zip=fs.readFileSync('./extension/dist/chrome-extension.zip');
  await fetch(`https://www.googleapis.com/upload/chromewebstore/v1.1/items/${EXTENSION_ID}`,{
    method:'PUT',
    headers:{'Authorization':`Bearer ${token}`,'x-goog-api-version':'2'},
    body:zip
  });

  // Publish
  const pubResp=await fetch(`https://www.googleapis.com/chromewebstore/v1.1/items/${EXTENSION_ID}/publish`,{
    method:'POST',
    headers:{'Authorization':`Bearer ${token}`,'x-goog-api-version':'2','Content-Type':'application/json'},
    body:JSON.stringify({publishTarget:'PUBLIC'})
  });
  console.log('Publish status',await pubResp.json());
}
main().catch(err=>{console.error(err);process.exit(1)});

Notes & caveats:
- You may need to add the service account email as a collaborator/uploader in the Chrome Web Store developer dashboard.
- Keep the service account key private; do not commit real keys to git.
- For production automation, store the key in a secrets manager or GitHub Actions secrets and reference it at runtime.

Placeholders in template:
- chrome-service-account-template.json: fill project_id, private_key, client_email, client_id.
- EXTENSION_ID: set to your extension's ID.

Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>
