import moment from 'moment'

export const fromNowFilter = {
  filters: {
    fromNow(datetime) {
      return datetime ? moment(datetime).locale('zh-tw').fromNow() : '--'
    }
  }
}

export const telFormat = {
  filters: {
    telFormat(tel) {
      // return `(${tel.slice(0, 3)}) ${tel.slice(4)}`.replace(/x/, "轉 ");
      const telArray = tel.split('-')
      let phoneNumber = `(${telArray[0]}) `
      for (let i = 1; i < telArray.length; i++) {
        i < telArray.length - 1
          ? (phoneNumber += `${telArray[i]}-`)
          : (phoneNumber += `${telArray[i]}`)
      }
      phoneNumber = phoneNumber.replace(/x/, '轉 ')
      return phoneNumber
    }
  }
}

export const nullAvatarFilter = {
  filters: {
    // 無頭像代替圖片
    nullAvatar(imgSrc) {
      const avatarImg = [
        require('../assets/Dinosaur-avatars-situations/Surprise.png'),
        require('../assets/Dinosaur-avatars-situations/Crying.png'),
        require('../assets/Dinosaur-avatars-situations/Dizzy.png'),
        require('../assets/Dinosaur-avatars-situations/Sick.png'),
        require('../assets/Dinosaur-avatars-situations/Embarrassed.png'),
        require('../assets/Dinosaur-avatars-situations/Fear.png'),

      ]
      return imgSrc || avatarImg[Math.floor(Math.random() * avatarImg.length)]
    }
  }
}

export const nullRestaurantFilter = {
  filters: {
    nullRestaurant(imgSrc) {
      const restaurantImg = [
        require('../assets/Food-stickers/Burger.png'),
        require('../assets/Food-stickers/Ramen.png'),
        require('../assets/Food-stickers/Nachos.png'),
        require('../assets/Food-stickers/Sandwich.png'),
        require('../assets/Food-stickers/Pizza.png'),
        require('../assets/Food-stickers/Sushi.png'),
      ]
      return imgSrc || restaurantImg[Math.floor(Math.random() * restaurantImg.length)]
    }
  }
}

export const emptyImageFilter = {
  filters: {
    emptyImage(src) {
      return src || 'https://via.placeholder.com/350x220/DFDFDF?text=No+Image'
    }
  }
}