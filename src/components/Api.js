class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  _handleError(err) {
    console.error(err);
    throw err; // Rethrow the error to be caught by the caller
  }

  // Loading user information from the server
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    })
      .then(this._checkResponse)
      .catch(this._handleError);
  }

  // Loading cards from the server
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
      .then(this._checkResponse)
      .catch(this._handleError);
  }

  // Editing the profile
  setUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        ...this._headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(this._checkResponse)
      .catch(this._handleError);
  }

  // Adding a new card
  addCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        ...this._headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(this._checkResponse)
      .catch(this._handleError);
  }

  // Deleting a card
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then(this._checkResponse)
      .catch(this._handleError);
  }

  // Adding and removing likes
  likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    })
      .then(this._checkResponse)
      .catch(this._handleError);
  }

  // Updating profile picture
  setUserAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        ...this._headers,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(this._checkResponse)
      .catch(this._handleError);
  }

  // Fetch both user info and initial cards concurrently
  getAppInfo() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()])
      .then(([userInfo, initialCards]) => {
        return { userInfo, initialCards };
      })
      .catch(this._handleError);
  }
}

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "0707b0a1-2f5a-47c0-9e96-fd250f6bb4a2",
    "Content-Type": "application/json",
  },
});

export default api;
