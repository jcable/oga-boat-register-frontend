import { boatRegisterHome } from '../util/constants';

const api1 = 'https://5li1jytxma.execute-api.eu-west-1.amazonaws.com';
const api2 = 'https://7epryku6aipef3mzdoxtds3e5i0yfgwn.lambda-url.eu-west-1.on.aws';

export async function putGeneralEnquiry(scope, subject, data) {
  return (await fetch(
    `${api1}/default/${scope}/${subject}`,
    {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: { 'content-type': 'application/json' }
    }
  )).json();
}

export async function shuffleBoats() {
  return (await fetch(
    `${api1}/default/shuffle`,
    {
      method: 'POST',
    }
  )).json();
}

export async function postBoatData(data) {
  return fetch(
    'https://t5lcpwbufg6ewyxswawwsbtkjq0kupbb.lambda-url.eu-west-1.on.aws/',
    {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'content-type': 'application/json' }
    }
  );
}

export async function postScopedData(scope, subject, data, accessToken) {
  const headers = {
    'content-type': 'application/json',
  };
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }
  return fetch(
    `${api1}/default/${scope}/${subject}`,
    {
      method: 'POST',
      body: JSON.stringify(data),
      headers,
    },
  );
}

export async function postGeneralEnquiry(scope, subject, data) {
  return fetch(
    `${api1}/default/${scope}/${subject}`,
    {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'content-type': 'application/json' }
    }
  );
}

export async function postCrewEnquiry(data) {
  return fetch(
    'https://bne25yrc5scp5qgffis2yfqaj40txzef.lambda-url.eu-west-1.on.aws/',
    {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'content-type': 'application/json' }
    }
  );
}

export async function createPhotoAlbum(name, ogaNo) {
  return fetch(`${api2}/`,
    {
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ name, oga_no: ogaNo }),
      method: 'POST',
    }
  );
}

export async function getBoatData(ogaNo) {
  const r = await fetch(`${boatRegisterHome}/boatregister/page-data/boat/${ogaNo}/page-data.json`);
  if (r.ok) {
    const data = await r.json();
    if (!Array.isArray(data.result.pageContext.boat.builder)) {
      data.result.pageContext.boat.builder = [data.result.pageContext.boat.builder];
    }
    if (!Array.isArray(data.result.pageContext.boat.designer)) {
      data.result.pageContext.boat.designer = [data.result.pageContext.boat.designer];
    }
    data.result.pageContext.boat.for_sales.sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at));
    return data;  
  }
}

export async function getPicklists() {
  return (await fetch(`${boatRegisterHome}/boatregister/pickers.json`)).json();
}
 
export async function getFilterable() {
  const extra = await getScopedData('public', 'crewing');
  const ex = Object.fromEntries(extra.Items.map((item) => [item.oga_no, item]));
  const filterable = await (await fetch(`${boatRegisterHome}/boatregister/filterable.json`)).json();
  return filterable.map((b) => {
    if (ex[b.oga_no]) {
      return { ...b, ...ex[b.oga_no]};
    }
    return b;
  });
}

export async function getThumb(albumKey) {
  return (await fetch(`${api2}/${albumKey}`)).json();
}

export async function getUploadCredentials() {
  return (await fetch('https://n5sfnt3ewfaq3lp4wqg64lzen40gzpdq.lambda-url.eu-west-1.on.aws/')).json();
}

export async function getAlbumKey(oga_no) {
  return (await fetch(`${api2}/albumKey/${oga_no}`)).json();
}

export async function getLargestImage(albumKey) {
  return (await fetch(`${api2}/${albumKey}/li`)).json();
}

export async function nextOgaNo() {
  const url = 'https://fxaj7udnm64v43j6fjo4zqer5u0xmhra.lambda-url.eu-west-1.on.aws';
  return (await fetch(`${url}/`)).json();
}

export async function disposeOgaNo(oga_no) {
  const r = await fetch(
    'https://fxaj7udnm64v43j6fjo4zqer5u0xmhra.lambda-url.eu-west-1.on.aws/',
    {
      method: 'POST',
      body: `${oga_no}`,
      headers: { 'content-type': 'application/json' }
    }
  );
  return r.json();
}

export async function getScopedData(scope, subject, filters, accessToken) {
  const headers = {
    'content-type': 'application/json',
  };
  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }
  const r = await fetch(
    `${api1}/default/${scope}/${subject}?${new URLSearchParams(filters)}`,
    {
      headers,
    });
  return r.json();
}