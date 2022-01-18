<template>
  <div>
    <el-row>
      <el-col :span="10" :offset="2">
        <h2>Лист заказов</h2>
        <ul class="order-list">
          <li class="order-value" v-for="item in orders" :key="item.user">
            {{ item.order }}
          </li>
        </ul>

        <el-button class="button" type="info" @click="closeDay"
          >Закрыть день</el-button
        >
      </el-col>
      <el-col :span="8" :offset="2">
        <h2>Новый заказ</h2>
        <el-select class="name" v-model="name" clearable placeholder="Имя">
          <el-option
            v-for="item in users"
            :key="item.value"
            :label="item.label"
            :value="item.label"
          >
          </el-option>
        </el-select>
        <el-input
          class="name"
          v-model="pass"
          placeholder="Hash"
          maxlength="15"
          clearable
        />
        <el-select
          class="shawarma"
          v-model="shawarma"
          clearable
          placeholder="Шаурма"
        >
          <el-option
            v-for="item in shawarmas"
            :key="item.value"
            :label="item.label"
            :value="item.label"
          >
          </el-option>
        </el-select>
        <el-select class="extra" v-model="extra" multiple placeholder="Допы">
          <el-option
            v-for="item in extras"
            :key="item.value"
            :label="item.label"
            :value="item.label"
          >
          </el-option>
        </el-select>
        <el-input
          class="name"
          v-model="pref"
          placeholder="Пожелания"
          maxlength="24"
          clearable
        />
        <el-button class="button" type="primary" @click="submit"
          >Заказ</el-button
        >
        <el-button class="button" type="danger" @click="deleteOrder"
          >Удалить заказ</el-button
        >
        <!-- <el-checkbox v-model="mini" label="Mini" size="medium"></el-checkbox> -->
      </el-col>
    </el-row>
    <el-row>
      <el-image
        style="width: 900px; height: 600px; margin: 0 auto"
        :src="require(`@/assets/menu.jpg`)"
        :fit="fill"
      ></el-image>
    </el-row>
  </div>
</template>

<script>
import EventService from "@/services/EventService.js";
import { mapActions } from "vuex";
import { mapState } from 'vuex'

export default {
  data() {
    return {
      shawarmas: [
        {
          value: "classic",
          label: "Классика",
          price: 270,
        },
        {
          value: "mexico",
          label: "Мексика",
          price: 270,
        },
        {
          value: "beef",
          label: "Говядина",
          price: 320,
        },
        {
          value: "turk",
          label: "Турецкая",
          price: 270,
        },
        {
          value: "mix",
          label: "Микс",
          price: 300,
        },
        {
          value: "nikita",
          label: "Ебаный салат для негиды",
          price: 190,
        },
      ],
      extras: [
        {
          value: "becon",
          label: "Бекон",
          price: 45,
        },
        {
          value: "chees",
          label: "Сыр",
          price: 45,
        },
        {
          value: "potato",
          label: "French fries",
          price: 45,
        },
        {
          value: "perec",
          label: "Перец",
          price: 20,
        },
        {
          value: "lawash",
          label: "Лаваш",
          price: 20,
        },
      ],
      users: [
        {
          value: "Маша",
          label: "Маша",
        },
        {
          value: "Миша",
          label: "Миша",
        },
        {
          value: "Федя",
          label: "Федя",
        },
        {
          value: "Ваня",
          label: "Ваня",
        },
        {
          value: "Валя",
          label: "Валя",
        },
        {
          value: "Виктор",
          label: "Виктор",
        },
        {
          value: "Василий",
          label: "Василий",
        },
        {
          value: "Денис",
          label: "Денис",
        },
        {
          value: "Артём",
          label: "Артём",
        },
        {
          value: "Илья",
          label: "Илья",
        },
        {
          value: "Никита",
          label: "Никита",
        },
      ],
      name: "",
      pass: "",
      shawarma: "",
      pref: "",
      mini: false,
      extra: [],
      orders: [],
    };
  },
  methods: {
    submit() {
      if (this.name == "" || this.shawarma == "") {
        console.log("tuturu");
        return;
      }

      let extras = "";
      this.extra.forEach((item) => {
        extras += `${item}, `;
      });
      extras = extras.substring(0, extras.length - 2);
      const order = {};
      order.user = this.name;
      order.pass = this.pass;
      order.order = `${this.name} - ${this.shawarma}`;
      if (extras) {
        order.order += ` + ${extras}`;
      }
      if (this.pref != "") {
        order.order += `  + ${this.pref}`;
      }

      this.logIn(order.pass);
      this.submitOrder(order);
    },
    deleteOrder() {
      EventService.deleteOrder(this.name, this.pass).then((response) => {
        console.log(response);
        this.fetchOrders();
      });
    },
    closeDay() {
      EventService.closeDay(this.name, this.pass).then((response) => {
        console.log(response);
        this.fetchOrders();
      });
    },
    submitOrder(order) {
      EventService.submitOrder(order)
        .then((response) => {
          console.log(response.data);
          if (response.data == "Not authorized") {
            return false;
          }
          this.fetchOrders();
        })
        .catch((error) => {
          console.log("There was an error: ", error);
          return false;
        });
    },
    findDuplicates(array, acc = []) {
      if (array.length == 0 || array == null) {
        console.log(acc);
        return acc;
      } else {
        let car = array[0];
        array = array.slice(1);
        let i = 1;

        array.forEach((item) => {
          if (item == car) {
            i++;
          }
        });
        array = array.filter((item) => item != car);
        acc.push((car += ` X${i}`));
        this.findDuplicates(array, acc);
      }
    },
    fetchOrders() {
      EventService.getOrders()
        .then((response) => {
          if (response.data) {
            this.orders = response.data;

            const stacked = this.findDuplicates(
              this.orders.map((item) => item.order.split("- ")[1])
            );
            console.log(stacked);
          }
        })
        .catch((error) => {
          console.log("There was an error: " + error);
        });
    },
    ...mapActions("user", ["logIn"]),
  },
  created() {
    this.fetchOrders();
    if (this.token) {
      this.pass = this.token
    }
  },
  computed: mapState("user", ["token"])
};
</script>

<style scoped>
h2 {
  margin-bottom: 25px;
}
.order-list {
  width: 100%;
  height: 270px;
}
.order-value {
  margin-bottom: 10px;
}
.name {
  display: block;
  width: 300px;
  margin-bottom: 15px;
}
.shawarma {
  width: 300px;
  margin-bottom: 15px;
  margin-right: 15px;
}
.mini {
  width: 25px;
}
.extra {
  display: block;
  width: 300px;
  margin-bottom: 15px;
}
.button {
  width: 140px;
  margin-right: 10px;
  margin-bottom: 25px;
}
</style>
