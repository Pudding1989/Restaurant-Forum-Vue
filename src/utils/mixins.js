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
        'https://cdn-icons-png.flaticon.com/512/817/817793.png',
        'https://cdn-icons-png.flaticon.com/512/817/817759.png',
        'https://cdn-icons-png.flaticon.com/512/817/817755.png',
        'https://cdn-icons-png.flaticon.com/512/817/817758.png',
        'https://cdn-icons-png.flaticon.com/512/817/817778.png',
        'https://cdn-icons-png.flaticon.com/512/817/817782.png'
      ]
      return imgSrc|| avatarImg[Math.floor(Math.random() * avatarImg.length)]
    }
  }
}

export const nullRestaurantFilter = {
  filters: {
    nullRestaurant(imgSrc) {
      const restaurantImg = [
        'https://cdn-icons-png.flaticon.com/512/4403/4403032.png',
        'https://cdn-icons-png.flaticon.com/512/4403/4403036.png',
        'https://cdn-icons-png.flaticon.com/512/4403/4403038.png',
        'https://cdn-icons-png.flaticon.com/512/4403/4403042.png',
        'https://cdn-icons-png.flaticon.com/512/4403/4403043.png',
        'https://cdn-icons-png.flaticon.com/512/4403/4403051.png',
        'https://cdn-icons-png.flaticon.com/512/4403/4403056.png'
      ]
      return imgSrc ||restaurantImg[Math.floor(Math.random() * restaurantImg.length)]
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