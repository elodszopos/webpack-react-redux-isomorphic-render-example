/* eslint no-param-reassign: 0, no-console: 0 */
export function downloadFile(content, name) {
  if (typeof content === 'object')	{
    content = JSON.stringify(content, null, 2);
  }

  const fakeForm = document.createElement('form');

  fakeForm.setAttribute('action', '/download');
  fakeForm.setAttribute('method', 'post');

  const fileName = document.createElement('textarea');

  fileName.setAttribute('name', 'filename');
  fileName.innerHTML = name;

  fakeForm.appendChild(fileName);

  const text = document.createElement('textarea');

  text.setAttribute('name', 'data');
  text.innerHTML = content;

  fakeForm.appendChild(text);

  document.body.appendChild(fakeForm[0]);
  fakeForm[0].submit();
  document.body.removeChild(fakeForm[0]);
}

export function uploadTextFile(file) {
  const reader = new FileReader();

  reader.onload = (event) =>	{
    const text = event.target.result;

    console.log('File content', text);
  };

  reader.readAsText(file);
}
