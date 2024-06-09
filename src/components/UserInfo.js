class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    const userInfo = {
      name: this._nameElement.textContent,
      job: this._jobElement.textContent,
    };

    if (this._avatarElement) {
      userInfo.avatar = this._avatarElement.src;
    }

    return userInfo;
  }

  setUserInfo({ name, job, avatar }) {
    if (name) {
      this._nameElement.textContent = name;
    }
    if (job) {
      this._jobElement.textContent = job;
    }
    if (avatar) {
      this._avatarElement.src = avatar;
    }
  }

  setUserAvatar(avatar) {
    this._avatarElement.src = avatar;
  }
}

export default UserInfo;
