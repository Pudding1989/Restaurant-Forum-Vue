<template>
  <div class="container py-5">
    <!-- NavTab 元件 -->
    <NavTabs />
    <h1 class="mt-5">最新動態</h1>
    <hr />
    <div class="row">
      <div class="col-md-6">
        <h3>最新餐廳</h3>
        <!-- 最新餐廳 NewestRestaurants -->
        <NewestRestaurants v-bind:restaurantsProp="restaurants" />
      </div>
      <div class="col-md-6">
        <!-- 最新評論 NewestComments-->
        <h3>最新評論</h3>
        <NewestComments v-bind:commentsProp="comments" />
      </div>
    </div>
  </div>
</template>

<script>
import NavTabs from '../components/NavTabs.vue'
import NewestRestaurants from '../components/NewestRestaurants.vue'
import NewestComments from '../components/NewestComments.vue'

const dummyData = {
  restaurants: [
    {
      id: 1,
      name: 'Jonathon Connelly',
      tel: '587-975-9942 x397',
      address: '5561 Maybell Vista',
      opening_hours: '08:00',
      description: 'amet non ut',
      image:
        'https://loremflickr.com/320/240/restaurant,food/?random=36.448866481618424',
      viewCounts: 0,
      createdAt: '2022-01-29T20:17:31.000Z',
      updatedAt: '2022-01-29T20:17:31.000Z',
      CategoryId: 4,
      Category: {
        id: 4,
        name: '墨西哥料理',
        createdAt: '2022-01-29T20:17:31.000Z',
        updatedAt: '2022-01-29T20:17:31.000Z',
      },
    },
    {
      id: 2,
      name: 'Alanna Stracke',
      tel: '813-690-7428',
      address: '0152 Alvena Corner',
      opening_hours: '08:00',
      description:
        'Porro incidunt tempora id cumque voluptate a voluptas aut.\nEt enim iure fugit aperiam.\nVoluptate natus tenetur perspiciatis quos voluptas saepe fuga asperiores qui.\nAliquid cupiditate omnis.\nIncidunt repudiandae aliquam nam eum repellat ratione est recusandae repellat.',
      image:
        'https://loremflickr.com/320/240/restaurant,food/?random=39.02209584712721',
      viewCounts: 0,
      createdAt: '2022-01-29T20:17:31.000Z',
      updatedAt: '2022-01-29T20:17:31.000Z',
      CategoryId: 3,
      Category: {
        id: 3,
        name: '義大利料理',
        createdAt: '2022-01-29T20:17:31.000Z',
        updatedAt: '2022-01-29T20:17:31.000Z',
      },
    },
    {
      id: 3,
      name: 'Julie Windler',
      tel: '(477) 964-8761 x67476',
      address: '8746 Pfeffer Fords',
      opening_hours: '08:00',
      description:
        'Tempora non et quam. Assumenda odio enim iure voluptatem expedita provident. Quae id et. Et laudantium ut aut impedit illo.\n \rUt eligendi impedit architecto. Mollitia qui dolore ut totam magni. Velit ut illo molestiae quibusdam. Animi odit maxime a rerum.\n \rAspernatur et nostrum error in aut sit dolorum quaerat sequi. Cum quaerat est dolore reprehenderit et qui facilis ullam voluptatibus. Itaque consequuntur sunt eveniet qui pariatur omnis ab. Quod quidem et facere non.',
      image:
        'https://loremflickr.com/320/240/restaurant,food/?random=87.97693141450307',
      viewCounts: 0,
      createdAt: '2022-01-29T20:17:31.000Z',
      updatedAt: '2022-01-29T20:17:31.000Z',
      CategoryId: 2,
      Category: {
        id: 2,
        name: '日本料理',
        createdAt: '2022-01-29T20:17:31.000Z',
        updatedAt: '2022-01-29T20:17:31.000Z',
      },
    },
    {
      id: 4,
      name: 'Corine Berge',
      tel: '353-686-3815 x9944',
      address: '402 Zachary Grove',
      opening_hours: '08:00',
      description:
        'Quia amet ut quidem alias et eos assumenda. Numquam dicta nam iste autem tempora qui dolorem sint. Animi necessitatibus quia libero laboriosam est quidem.\n \rSuscipit et aut saepe commodi vel modi. Ratione eligendi sit. Voluptatibus est mollitia inventore vel voluptatem assumenda.\n \rRerum qui quod veniam fuga reiciendis laudantium. Nihil aspernatur fuga aspernatur ut vel dignissimos accusamus ab iste. Sunt dolore consequatur enim.',
      image:
        'https://loremflickr.com/320/240/restaurant,food/?random=65.03715520321542',
      viewCounts: 0,
      createdAt: '2022-01-29T20:17:31.000Z',
      updatedAt: '2022-01-29T20:17:31.000Z',
      CategoryId: 5,
      Category: {
        id: 5,
        name: '素食料理',
        createdAt: '2022-01-29T20:17:31.000Z',
        updatedAt: '2022-01-29T20:17:31.000Z',
      },
    },
    {
      id: 5,
      name: 'Janie Walsh',
      tel: '814.258.2187 x170',
      address: '5400 Holden Center',
      opening_hours: '08:00',
      description:
        'Neque enim fuga repudiandae est. Et suscipit velit. Nesciunt et veritatis. Aliquid debitis consequatur nobis.',
      image:
        'https://loremflickr.com/320/240/restaurant,food/?random=55.32861943631882',
      viewCounts: 0,
      createdAt: '2022-01-29T20:17:31.000Z',
      updatedAt: '2022-01-29T20:17:31.000Z',
      CategoryId: 2,
      Category: {
        id: 2,
        name: '日本料理',
        createdAt: '2022-01-29T20:17:31.000Z',
        updatedAt: '2022-01-29T20:17:31.000Z',
      },
    },
    {
      id: 6,
      name: 'Franz Rutherford Jr.',
      tel: '754.254.0451 x93002',
      address: '2985 Marjorie Square',
      opening_hours: '08:00',
      description:
        'Molestias veniam aspernatur ea maxime a aut possimus eos. Alias porro qui. Non et officia sint libero nesciunt quo. Quibusdam laboriosam voluptatem quod ut nemo nobis placeat.\n \rNemo ut reiciendis temporibus ut. Ipsa ut rerum magnam laboriosam modi. Occaecati maiores et voluptate sunt commodi voluptas ea et. Tempora sit placeat vitae officiis.\n \rPossimus omnis provident qui nostrum ut error vel. Ducimus et facere. Sunt quibusdam dicta nesciunt ex non et possimus assumenda quas. Et et dolor rerum omnis unde.',
      image:
        'https://loremflickr.com/320/240/restaurant,food/?random=99.60749304082437',
      viewCounts: 0,
      createdAt: '2022-01-29T20:17:31.000Z',
      updatedAt: '2022-01-29T20:17:31.000Z',
      CategoryId: 4,
      Category: {
        id: 4,
        name: '墨西哥料理',
        createdAt: '2022-01-29T20:17:31.000Z',
        updatedAt: '2022-01-29T20:17:31.000Z',
      },
    },
    {
      id: 7,
      name: 'Sandy Kuhlman',
      tel: '743.715.7184 x28378',
      address: "308 O'Kon Throughway",
      opening_hours: '08:00',
      description:
        'Assumenda sit vel adipisci officia nisi mollitia perspiciatis. Et quis quae quo quis. Quos molestiae consequatur illo perspiciatis dicta dicta non exercitationem consequatur.',
      image:
        'https://loremflickr.com/320/240/restaurant,food/?random=54.030404307063606',
      viewCounts: 0,
      createdAt: '2022-01-29T20:17:31.000Z',
      updatedAt: '2022-01-29T20:17:31.000Z',
      CategoryId: 2,
      Category: {
        id: 2,
        name: '日本料理',
        createdAt: '2022-01-29T20:17:31.000Z',
        updatedAt: '2022-01-29T20:17:31.000Z',
      },
    },
    {
      id: 8,
      name: 'Doug Hegmann',
      tel: '050-118-8496 x770',
      address: '2147 Florencio Wall',
      opening_hours: '08:00',
      description: 'Mollitia odit unde voluptas.',
      image:
        'https://loremflickr.com/320/240/restaurant,food/?random=17.847453207262642',
      viewCounts: 0,
      createdAt: '2022-01-29T20:17:31.000Z',
      updatedAt: '2022-01-29T20:17:31.000Z',
      CategoryId: 1,
      Category: {
        id: 1,
        name: '中式料理',
        createdAt: '2022-01-29T20:17:31.000Z',
        updatedAt: '2022-01-29T20:17:31.000Z',
      },
    },
    {
      id: 9,
      name: 'Mathilde Heidenreich',
      tel: '813-641-3441 x197',
      address: '4018 Cristopher Locks',
      opening_hours: '08:00',
      description: 'voluptas quia at',
      image:
        'https://loremflickr.com/320/240/restaurant,food/?random=39.42049008627797',
      viewCounts: 0,
      createdAt: '2022-01-29T20:17:31.000Z',
      updatedAt: '2022-01-29T20:17:31.000Z',
      CategoryId: 3,
      Category: {
        id: 3,
        name: '義大利料理',
        createdAt: '2022-01-29T20:17:31.000Z',
        updatedAt: '2022-01-29T20:17:31.000Z',
      },
    },
    {
      id: 10,
      name: 'Kacey Cremin',
      tel: '756.320.3803 x37570',
      address: '8296 Gerhold Mountain',
      opening_hours: '08:00',
      description: 'atque recusandae quidem',
      image:
        'https://loremflickr.com/320/240/restaurant,food/?random=12.576851635191687',
      viewCounts: 0,
      createdAt: '2022-01-29T20:17:31.000Z',
      updatedAt: '2022-01-29T20:17:31.000Z',
      CategoryId: 3,
      Category: {
        id: 3,
        name: '義大利料理',
        createdAt: '2022-01-29T20:17:31.000Z',
        updatedAt: '2022-01-29T20:17:31.000Z',
      },
    },
  ],
  comments: [
    {
      id: 5,
      text: 'In fugit et necessitatibus ea vel iure tempore dolorum cum.',
      UserId: 1,
      RestaurantId: 5,
      createdAt: '2022-01-29T20:17:31.000Z',
      updatedAt: '2022-01-29T20:17:31.000Z',
      User: {
        id: 1,
        name: 'root',
        email: 'root@example.com',
        password:
          '$2a$10$8Fhj4kFkv54mtmkPQFu/PeJfNwLqalcUWMqCofo5.jV2xQFBBXvx6',
        isAdmin: true,
        image: null,
        createdAt: '2022-01-29T20:17:31.000Z',
        updatedAt: '2022-01-29T20:17:31.000Z',
      },
      Restaurant: {
        id: 5,
        name: 'Janie Walsh',
        tel: '814.258.2187 x170',
        address: '5400 Holden Center',
        opening_hours: '08:00',
        description:
          'Neque enim fuga repudiandae est. Et suscipit velit. Nesciunt et veritatis. Aliquid debitis consequatur nobis.',
        image:
          'https://loremflickr.com/320/240/restaurant,food/?random=55.32861943631882',
        viewCounts: 0,
        createdAt: '2022-01-29T20:17:31.000Z',
        updatedAt: '2022-01-29T20:17:31.000Z',
        CategoryId: 2,
      },
    },
    {
      id: 22,
      text: 'Dolores aut aut voluptatum ratione velit itaque omnis voluptatum ut.',
      UserId: 1,
      RestaurantId: 22,
      createdAt: '2022-01-29T20:17:31.000Z',
      updatedAt: '2022-01-29T20:17:31.000Z',
      User: {
        id: 1,
        name: 'root',
        email: 'root@example.com',
        password:
          '$2a$10$8Fhj4kFkv54mtmkPQFu/PeJfNwLqalcUWMqCofo5.jV2xQFBBXvx6',
        isAdmin: true,
        image: null,
        createdAt: '2022-01-29T20:17:31.000Z',
        updatedAt: '2022-01-29T20:17:31.000Z',
      },
      Restaurant: {
        id: 22,
        name: 'Fredy Thompson',
        tel: '1-321-361-6681',
        address: '05396 Malvina Squares',
        opening_hours: '08:00',
        description: 'dolorum',
        image:
          'https://loremflickr.com/320/240/restaurant,food/?random=16.038649086768753',
        viewCounts: 0,
        createdAt: '2022-01-29T20:17:31.000Z',
        updatedAt: '2022-01-29T20:17:31.000Z',
        CategoryId: 2,
      },
    },
    {
      id: 45,
      text: 'Inventore incidunt saepe.',
      UserId: 1,
      RestaurantId: 45,
      createdAt: '2022-01-29T20:17:31.000Z',
      updatedAt: '2022-01-29T20:17:31.000Z',
      User: {
        id: 1,
        name: 'root',
        email: 'root@example.com',
        password:
          '$2a$10$8Fhj4kFkv54mtmkPQFu/PeJfNwLqalcUWMqCofo5.jV2xQFBBXvx6',
        isAdmin: true,
        image: null,
        createdAt: '2022-01-29T20:17:31.000Z',
        updatedAt: '2022-01-29T20:17:31.000Z',
      },
      Restaurant: {
        id: 45,
        name: 'Glenna Goodwin',
        tel: '(208) 074-2694 x58821',
        address: '8198 Bechtelar Corner',
        opening_hours: '08:00',
        description:
          'Qui nobis consequatur quisquam ducimus error aut. Corporis id error dolorem. Doloribus et est doloribus quo nihil. Voluptatum sunt temporibus autem atque qui et minus non.\n \rQuis mollitia minima expedita. Alias omnis autem sapiente qui rem temporibus culpa quas. Sed corporis deserunt amet. Quia qui velit quod.\n \rAb sint aut minus eligendi consectetur similique aperiam. Voluptatem placeat similique earum. Repudiandae possimus ipsam rerum ut nihil voluptates eum aut. Et vel explicabo ut quam earum recusandae. Unde beatae eum vero molestiae reprehenderit. Ut et sit illo id blanditiis quas sed atque alias.',
        image:
          'https://loremflickr.com/320/240/restaurant,food/?random=80.01595312267997',
        viewCounts: 0,
        createdAt: '2022-01-29T20:17:31.000Z',
        updatedAt: '2022-01-29T20:17:31.000Z',
        CategoryId: 3,
      },
    },
    {
      id: 69,
      text: 'Laboriosam minima sed ducimus pariatur quia nihil.',
      UserId: 1,
      RestaurantId: 19,
      createdAt: '2022-01-29T20:17:31.000Z',
      updatedAt: '2022-01-29T20:17:31.000Z',
      User: {
        id: 1,
        name: 'root',
        email: 'root@example.com',
        password:
          '$2a$10$8Fhj4kFkv54mtmkPQFu/PeJfNwLqalcUWMqCofo5.jV2xQFBBXvx6',
        isAdmin: true,
        image: null,
        createdAt: '2022-01-29T20:17:31.000Z',
        updatedAt: '2022-01-29T20:17:31.000Z',
      },
      Restaurant: {
        id: 19,
        name: 'Darrick Bartoletti',
        tel: '1-028-711-1996',
        address: '317 Rocky Junction',
        opening_hours: '08:00',
        description: 'et accusantium est',
        image:
          'https://loremflickr.com/320/240/restaurant,food/?random=1.631650061860701',
        viewCounts: 0,
        createdAt: '2022-01-29T20:17:31.000Z',
        updatedAt: '2022-01-29T20:17:31.000Z',
        CategoryId: 4,
      },
    },
    {
      id: 92,
      text: 'Fugiat ut rerum placeat enim laboriosam molestias quasi et itaque.',
      UserId: 1,
      RestaurantId: 42,
      createdAt: '2022-01-29T20:17:31.000Z',
      updatedAt: '2022-01-29T20:17:31.000Z',
      User: {
        id: 1,
        name: 'root',
        email: 'root@example.com',
        password:
          '$2a$10$8Fhj4kFkv54mtmkPQFu/PeJfNwLqalcUWMqCofo5.jV2xQFBBXvx6',
        isAdmin: true,
        image: null,
        createdAt: '2022-01-29T20:17:31.000Z',
        updatedAt: '2022-01-29T20:17:31.000Z',
      },
      Restaurant: {
        id: 42,
        name: 'Morgan Funk',
        tel: '1-297-184-6977',
        address: '14551 Wunsch Shores',
        opening_hours: '08:00',
        description:
          'Sint quo vel. Veritatis accusamus hic hic laudantium voluptas dolor. Ut voluptatem quia est reprehenderit cum et molestias. Quaerat reprehenderit minima nihil adipisci dignissimos et perspiciatis. Fugiat quibusdam earum.',
        image:
          'https://loremflickr.com/320/240/restaurant,food/?random=83.68662227006105',
        viewCounts: 0,
        createdAt: '2022-01-29T20:17:31.000Z',
        updatedAt: '2022-01-29T20:17:31.000Z',
        CategoryId: 3,
      },
    },
    {
      id: 124,
      text: 'Aliquam at repudiandae est aperiam.',
      UserId: 1,
      RestaurantId: 24,
      createdAt: '2022-01-29T20:17:31.000Z',
      updatedAt: '2022-01-29T20:17:31.000Z',
      User: {
        id: 1,
        name: 'root',
        email: 'root@example.com',
        password:
          '$2a$10$8Fhj4kFkv54mtmkPQFu/PeJfNwLqalcUWMqCofo5.jV2xQFBBXvx6',
        isAdmin: true,
        image: null,
        createdAt: '2022-01-29T20:17:31.000Z',
        updatedAt: '2022-01-29T20:17:31.000Z',
      },
      Restaurant: {
        id: 24,
        name: 'Aida Grady',
        tel: '1-123-778-2079',
        address: '29719 Friedrich Valleys',
        opening_hours: '08:00',
        description: 'veniam',
        image:
          'https://loremflickr.com/320/240/restaurant,food/?random=81.06632440349335',
        viewCounts: 0,
        createdAt: '2022-01-29T20:17:31.000Z',
        updatedAt: '2022-01-29T20:17:31.000Z',
        CategoryId: 2,
      },
    },
    {
      id: 136,
      text: 'Pariatur omnis et temporibus repellat quidem molestiae voluptatem.',
      UserId: 1,
      RestaurantId: 36,
      createdAt: '2022-01-29T20:17:31.000Z',
      updatedAt: '2022-01-29T20:17:31.000Z',
      User: {
        id: 1,
        name: 'root',
        email: 'root@example.com',
        password:
          '$2a$10$8Fhj4kFkv54mtmkPQFu/PeJfNwLqalcUWMqCofo5.jV2xQFBBXvx6',
        isAdmin: true,
        image: null,
        createdAt: '2022-01-29T20:17:31.000Z',
        updatedAt: '2022-01-29T20:17:31.000Z',
      },
      Restaurant: {
        id: 36,
        name: 'Hoyt Balistreri DVM',
        tel: '897.337.5739',
        address: '35220 Koss Knolls',
        opening_hours: '08:00',
        description: 'Libero exercitationem velit quo libero amet similique.',
        image:
          'https://loremflickr.com/320/240/restaurant,food/?random=11.411311616650455',
        viewCounts: 0,
        createdAt: '2022-01-29T20:17:31.000Z',
        updatedAt: '2022-01-29T20:17:31.000Z',
        CategoryId: 1,
      },
    },
    {
      id: 6,
      text: 'Rem consequatur fuga ut veritatis ut.',
      UserId: 2,
      RestaurantId: 6,
      createdAt: '2022-01-29T20:17:31.000Z',
      updatedAt: '2022-01-29T20:17:31.000Z',
      User: {
        id: 2,
        name: 'user1',
        email: 'user1@example.com',
        password:
          '$2a$10$UFVyItuSQsryCf3cGEkbC.86d2x2eHeV2JEhMUkkVSpD3rjwx7wWS',
        isAdmin: false,
        image: null,
        createdAt: '2022-01-29T20:17:31.000Z',
        updatedAt: '2022-01-29T20:17:31.000Z',
      },
      Restaurant: {
        id: 6,
        name: 'Franz Rutherford Jr.',
        tel: '754.254.0451 x93002',
        address: '2985 Marjorie Square',
        opening_hours: '08:00',
        description:
          'Molestias veniam aspernatur ea maxime a aut possimus eos. Alias porro qui. Non et officia sint libero nesciunt quo. Quibusdam laboriosam voluptatem quod ut nemo nobis placeat.\n \rNemo ut reiciendis temporibus ut. Ipsa ut rerum magnam laboriosam modi. Occaecati maiores et voluptate sunt commodi voluptas ea et. Tempora sit placeat vitae officiis.\n \rPossimus omnis provident qui nostrum ut error vel. Ducimus et facere. Sunt quibusdam dicta nesciunt ex non et possimus assumenda quas. Et et dolor rerum omnis unde.',
        image:
          'https://loremflickr.com/320/240/restaurant,food/?random=99.60749304082437',
        viewCounts: 0,
        createdAt: '2022-01-29T20:17:31.000Z',
        updatedAt: '2022-01-29T20:17:31.000Z',
        CategoryId: 4,
      },
    },
    {
      id: 37,
      text: 'Aut eaque assumenda harum ab ex.',
      UserId: 2,
      RestaurantId: 37,
      createdAt: '2022-01-29T20:17:31.000Z',
      updatedAt: '2022-01-29T20:17:31.000Z',
      User: {
        id: 2,
        name: 'user1',
        email: 'user1@example.com',
        password:
          '$2a$10$UFVyItuSQsryCf3cGEkbC.86d2x2eHeV2JEhMUkkVSpD3rjwx7wWS',
        isAdmin: false,
        image: null,
        createdAt: '2022-01-29T20:17:31.000Z',
        updatedAt: '2022-01-29T20:17:31.000Z',
      },
      Restaurant: {
        id: 37,
        name: 'Emilia Prosacco',
        tel: '1-437-673-3837',
        address: '079 Micaela Junction',
        opening_hours: '08:00',
        description:
          'Vitae sint dicta laudantium deserunt labore. Eos quas voluptatem possimus illo consequuntur molestiae omnis officiis occaecati. Ea ab et nobis aut. Id optio soluta sint nulla praesentium. Eaque molestias voluptas corporis nostrum dolores perferendis.\n \rQuisquam consequatur sed id totam dolores. Vero quod expedita ea quia. Vitae quis consequatur. Architecto qui ab.\n \rNostrum ipsam veniam voluptas aut earum repellendus officia rerum aliquam. Tenetur ea laborum architecto facilis eum. Exercitationem dignissimos omnis vel.',
        image:
          'https://loremflickr.com/320/240/restaurant,food/?random=51.295394146146364',
        viewCounts: 0,
        createdAt: '2022-01-29T20:17:31.000Z',
        updatedAt: '2022-01-29T20:17:31.000Z',
        CategoryId: 4,
      },
    },
    {
      id: 61,
      text: 'Aut pariatur soluta doloribus eveniet magni consequatur iste tempora.',
      UserId: 2,
      RestaurantId: 11,
      createdAt: '2022-01-29T20:17:31.000Z',
      updatedAt: '2022-01-29T20:17:31.000Z',
      User: {
        id: 2,
        name: 'user1',
        email: 'user1@example.com',
        password:
          '$2a$10$UFVyItuSQsryCf3cGEkbC.86d2x2eHeV2JEhMUkkVSpD3rjwx7wWS',
        isAdmin: false,
        image: null,
        createdAt: '2022-01-29T20:17:31.000Z',
        updatedAt: '2022-01-29T20:17:31.000Z',
      },
      Restaurant: {
        id: 11,
        name: 'Garth Lesch',
        tel: '183-141-0623',
        address: '48259 Rickey Crescent',
        opening_hours: '08:00',
        description:
          'Sunt dolor harum. Quod sunt blanditiis incidunt est quis. Qui nobis ullam quibusdam. Accusantium ea nulla consequuntur dolores perspiciatis numquam. Voluptas est harum rerum consequuntur autem magni id modi.',
        image:
          'https://loremflickr.com/320/240/restaurant,food/?random=1.3162454683631308',
        viewCounts: 0,
        createdAt: '2022-01-29T20:17:31.000Z',
        updatedAt: '2022-01-29T20:17:31.000Z',
        CategoryId: 4,
      },
    },
  ],
}

export default {
  components: {
    NavTabs,
    NewestRestaurants,
    NewestComments,
  },
  data() {
    return {
      restaurants: [],
      comments: [],
    }
  },
  methods: {
    fetchFeeds() {
      // fetch API
      const { restaurants, comments } = dummyData
      this.restaurants = restaurants
      // 檢查 comment 的餐廳跟留言資料是否存在
      this.comments = comments.filter(
        (comment) => comment.Restaurant && comment.text
      )
    },
  },

  created() {
    this.fetchFeeds()
  },
}
</script>