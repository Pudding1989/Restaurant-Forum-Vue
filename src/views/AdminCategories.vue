<template>
  <div class="container py-5">
    <!-- 1. 使用先前寫好的 AdminNav -->
    <AdminNav />

    <form class="my-4">
      <div class="form-row">
        <div class="col-auto">
          <input
            type="text"
            v-model="newCategoryName"
            class="form-control"
            placeholder="新增餐廳類別..."
          />
        </div>
        <div class="col-auto">
          <button
            type="button"
            @click.stop.prevent="createCategory"
            class="btn btn-primary"
          >
            新增
          </button>
        </div>
      </div>
    </form>
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col" width="60">#</th>
          <th scope="col">Category Name</th>
          <th scope="col" width="210">Action</th>
        </tr>
      </thead>
      <transition-group tag="tbody" name="tbody">
        <tr v-for="category in categories" :key="category.id">
          <th scope="row">
            {{ category.id }}
          </th>
          <td class="position-relative">
            <div v-show="!category.isEditing" class="category-name">
              {{ category.name }}
            </div>
            <input
              v-show="category.isEditing"
              v-model="category.name"
              type="text"
              class="form-control"
            />
            <span
              v-show="category.isEditing"
              @click="handleCancel(category.id)"
              class="cancel"
            >
              ✕
            </span>
          </td>
          <td class="d-flex justify-content-between">
            <button
              v-show="!category.isEditing"
              @click.stop.prevent="toggleIsEditing(category.id)"
              type="button"
              class="btn btn-link mr-2"
            >
              Edit
            </button>
            <button
              v-show="category.isEditing"
              @click.stop.prevent="
                updateCategory({ categoryId: category.id, name: category.name })
              "
              type="button"
              class="btn btn-link mr-2"
            >
              Save
            </button>
            <button
              type="button"
              @click.stop.prevent="deleteCategory(category.id)"
              class="btn btn-link mr-2"
            >
              Delete
            </button>
          </td>
        </tr>
      </transition-group>
    </table>
  </div>
</template>

<style scoped>
/* scoped 確保只作用在當下 Component */
.category-name {
  padding: 0.375rem 0.75rem;
  border: 1px solid transparent;
  outline: 0;
  cursor: auto;
}

.btn-link {
  width: 62px;
}

.cancel {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  border: 1px solid #aaaaaa;
  border-radius: 50%;
  user-select: none;
  cursor: pointer;
  font-size: 12px;
}

.tbody-enter,
.tbody-leave-to {
  transform-origin: bottom;
  transform: scaleY(0);
}

.tbody-enter-to,
.tbody-leave {
  transform-origin: top;
  transform: scaleY(1);
}

.tbody-enter-active {
  transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.285);
}

.tbody-leave-active {
  transition: transform 0.35s cubic-bezier(0.175, 0.885, 0.1, 1);
  /* visibility: hidden;
  position: absolute; */
}
</style>

<script>
import AdminNav from '@/components/AdminNav'
import adminAPI from '../apis/admin'
import { Toast } from '../utils/helpers'

export default {
  components: {
    AdminNav
  },
  //  定義 Vue 中使用的 data 資料
  data() {
    return {
      newCategoryName: '',
      categories: []
    }
  },
  // 調用 `fetchCategories` 方法
  created() {
    this.fetchCategories()
  },
  methods: {
    // 4. 定義 fetchCategories 方法，把 response data 帶入 Vue 物件
    async fetchCategories() {
      try {
        const { data, statusText } = await adminAPI.categories.get()
        if (statusText !== 'OK') {
          console.log(statusText)
          throw new Error('無法取得餐廳類別')
        }
        this.categories = data.categories.map((category) => ({
          ...category,
          // 增加屬性，來切換編輯模式
          isEditing: false,
          // 備份編輯前資料用
          nameCached: ''
        }))
      } catch (error) {
        Toast.fire({
          icon: 'warning',
          title: '無法取得餐廳類別<br>，請稍後再試'
        })
      }
    },
    async createCategory() {
      try {
        const { data } = await adminAPI.categories.create({
          name: this.newCategoryName
        })
        // 檢查後端操作成功與否
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        // 後端傳回後，成功後操作 vue
        this.categories.push({
          // 由後端產生
          id: data.categoryId,
          name: this.newCategoryName
        })

        Toast.fire({
          icon: 'success',
          title: '成功新增餐廳類別'
        })
        // 清空欄位
        this.newCategoryName = ''
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'warning',
          title: '無法新增餐廳類別<br>，請稍後再試'
        })
      }
    },
    async deleteCategory(categoryId) {
      try {
        // 透過 API 告知伺服器要刪除的餐廳類別
        const { data } = await adminAPI.categories.delete({ categoryId })
        if (data.status !== 'success') {
          throw new Error(data.message)
        }

        for (const category of this.categories) {
          if (category.id === categoryId) {
            Toast.fire({
              icon: 'success',
              title: `成功刪除&thinsp;『 ${category.name} 』餐廳類別`
            })
          }
        }
        // 收到 API 回應，從 data屬性裡移除
        this.categories = this.categories.filter(
          (category) => category.id !== categoryId
        )
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'warning',
          title: '無法刪除餐廳類別<br>，請稍後再試'
        })
      }
    },
    async updateCategory({ categoryId, name }) {
      try {
        // 排除沒有修改的資料向後端發出請求
        for (const category of this.categories) {
          if (
            category.id === categoryId &&
            category.name === category.nameCached
          ) {
            Toast.fire({
              icon: 'info',
              title: '輸入的類別名稱<br>與原本內容相同'
            })
            return
          }
        }

        // 透過 API 去向伺服器更新餐廳類別名稱
        const { data } = await adminAPI.categories.update({ categoryId, name })
        // 檢查 API 結果
        if (data.status !== 'success') {
          throw new Error(data.message)
        }
        // 切換對應按鈕狀態
        this.toggleIsEditing(categoryId)
        Toast.fire({
          icon: 'success',
          title: '已成功修改餐廳類別'
        })
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'warning',
          title: '無法修改餐廳類別<br>，請稍後再試'
        })
      }
    },
    toggleIsEditing(categoryId) {
      this.categories = this.categories.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            isEditing: !category.isEditing,
            // 備份一份編輯前資料
            nameCached: category.name
          }
        }
        // id 不符的回傳原本資料
        return category
      })
    },

    handleCancel(categoryId) {
      this.categories = this.categories.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,

            // 把原本的餐廳類別名稱還回去
            name: category.nameCached
          }
        }
        // id 不符的回傳原本資料
        return category
      })
      // 切換編輯模式
      this.toggleIsEditing(categoryId)
    }
  }
}
</script>
