<template>
  <div class="container">
    <div>
      <h1 class="text-xl font-bold mb-4">ALARM</h1>
      <div v-if="loading" class="text-center">
        <p>Loading...</p>
      </div>
      <div v-else-if="filteredAlarms.length === 0" class="text-center">
        <p>Tidak ada Alarm, sistem Normal ^_^</p>
      </div>
      <div v-else>
        <el-table :data="filteredAlarms" border style="width: 100%">
          <el-table-column label="No" width="50" type="index"></el-table-column>
          <el-table-column prop="source" label="Source" width="200"></el-table-column>
          <el-table-column label="Keterangan" width="700">
            <template #default="scope">
              {{ scope.row.error }}
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import axios from 'axios'
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export default {
  name: 'AlarmPage',
  setup() {
    const alarms = ref([]);
    const loading = ref(true);
    let pollingInterval = null;

    const fetchDynamicAlarms = async () => {
      try {
        const response = await axios.get(`${apiBaseUrl}/api/alarms`);

        if (!response.data || !Array.isArray(response.data)) {
          alarms.value = [];
          return;
        }

        alarms.value = response.data;
      } catch (error) {
        console.error('Failed to fetch alarms:', error);
      } finally {
        loading.value = false;
      }
    };

    const startPolling = () => {
      pollingInterval = setInterval(() => {
        fetchDynamicAlarms();
      }, 2000);
    };

    const stopPolling = () => {
      if (pollingInterval) {
        clearInterval(pollingInterval);
      }
    };

    const filteredAlarms = computed(() => {
      return alarms.value;
    });

    onMounted(() => {
      fetchDynamicAlarms();
      startPolling();
    });

    onBeforeUnmount(() => {
      stopPolling();
    });

    return {
      alarms,
      loading,
      filteredAlarms,
    };
  },
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  height: 40vh;
  text-align: center;
}

h1 {
  margin-bottom: 1rem;
}

.el-table {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.text-center {
  text-align: center;
}

.mt-4 {
  margin-top: 1rem;
}
</style>
