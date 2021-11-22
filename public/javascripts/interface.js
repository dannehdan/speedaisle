var addCheck = id => {
  if (document.getElementById(id).getAttribute('checked')) {
    document.getElementById(id).removeAttribute('checked');
  } else {
    document.getElementById(id).setAttribute('checked', 'checked');
  }

  const likeUrl = '/list/check';
  const data = { postId: id, checked: document.getElementById(id).getAttribute('checked')};

  fetch(likeUrl, {
      method: 'PATCH', // or 'PUT'
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch(error => {
        console.error('Error:', error);
      });

    return;
};

var deleteItem = id => {
  var itemDiv = document.getElementsByClassName(`${id}`)[0]
  itemDiv.style.display = 'none';

  const removeUrl = '/list/remove'
  const data = { removeId: id }

  fetch(removeUrl, {
    method: 'DELETE', 
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch(error => {
      console.error('Error:', error);
    });

  return;
}
