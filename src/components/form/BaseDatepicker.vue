<script setup>
// TODO: refactorizar este componente para que sea más genérico y reutilizable
import { computed, nextTick, ref, watch, defineProps, defineEmits } from 'vue'

const props = defineProps({
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: 'Selecciona una fecha' },
  dateFormat: { type: String, default: 'dd/MM/yyyy' },
  isOpen: { type: Boolean, default: undefined },
})
const emit = defineEmits(['update:modelValue'])

const currentDate = ref(new Date())
const selectedDate = ref(props.modelValue || null)
const isCalendarOpen = ref(false)

watch(
  () => props.isOpen,
  val => {
    if (typeof val === 'boolean') {
      isCalendarOpen.value = val
    }
  },
  { immediate: true },
)

const days = computed(() => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  const firstDayOfMonth = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1
  let daysArray = Array(adjustedFirstDay).fill(null)
  daysArray = [...daysArray, ...Array.from({ length: daysInMonth }, (_, i) => i + 1)]
  return daysArray
})

watch(
  () => props.modelValue,
  val => {
    selectedDate.value = val
  },
)

watch([currentDate, isCalendarOpen], async () => {
  await nextTick()
})

const handlePrevMonth = () => {
  currentDate.value = new Date(currentDate.value.setMonth(currentDate.value.getMonth() - 1))
}

const handleNextMonth = () => {
  currentDate.value = new Date(currentDate.value.setMonth(currentDate.value.getMonth() + 1))
}

const handleToggleCalendar = () => {
  if (typeof props.isOpen === 'boolean') return
  isCalendarOpen.value = !isCalendarOpen.value
}

const isSelected = day => {
  if (day === null || !selectedDate.value) return false
  const selectedDateObj = new Date(selectedDate.value)
  return (
    selectedDateObj.getDate() === day &&
    selectedDateObj.getMonth() === currentDate.value.getMonth() &&
    selectedDateObj.getFullYear() === currentDate.value.getFullYear()
  )
}

const isToday = day => {
  if (day === null) return false
  const today = new Date()
  return (
    day === today.getDate() &&
    currentDate.value.getMonth() === today.getMonth() &&
    currentDate.value.getFullYear() === today.getFullYear()
  )
}

// Formatea SIEMPRE a yyyy-MM-dd para el valor emitido
const formatToISO = dateObj => {
  if (!dateObj) return ''
  const pad = n => n.toString().padStart(2, '0')
  const year = dateObj.getFullYear()
  const month = pad(dateObj.getMonth() + 1)
  const day = pad(dateObj.getDate())
  return `${year}-${month}-${day}`
}

// Formatea para mostrar en el input
const formatForDisplay = dateStr => {
  if (!dateStr) return ''
  const dateObj = new Date(dateStr)
  const pad = n => n.toString().padStart(2, '0')
  const year = dateObj.getFullYear()
  const month = pad(dateObj.getMonth() + 1)
  const day = pad(dateObj.getDate())
  if (props.dateFormat === 'yyyy-MM-dd') return `${year}-${month}-${day}`
  if (props.dateFormat === 'dd/MM/yyyy') return `${day}/${month}/${year}`
  return `${day}/${month}/${year}`
}

const selectDate = day => {
  const year = currentDate.value.getFullYear()
  const month = currentDate.value.getMonth()
  const dateObj = new Date(year, month, day)
  const isoDate = formatToISO(dateObj)
  selectedDate.value = isoDate
  emit('update:modelValue', isoDate)
  if (typeof props.isOpen === 'boolean') return
  isCalendarOpen.value = false
}
</script>

<template>
  <section>
    <div class="container">
      <div class="mx-auto w-full max-w-[510px]">
        <div class="relative mb-3">
          <input
            id="datepicker"
            type="text"
            :placeholder="placeholder"
            class="bg-transparent h-12 w-full appearance-none rounded-lg border border-stroke pl-12 pr-4 text-dark outline-none focus:border-primary dark:border-dark-3 dark:bg-dark-2"
            :value="formatForDisplay(selectedDate)"
            readonly
            @click="handleToggleCalendar"
          />
          <span
            id="toggleDatepicker"
            class="absolute inset-y-0 flex h-12 w-12 items-center justify-center text-dark-5"
            @click="handleToggleCalendar"
          >
            <svg
              width="21"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 3.3125H16.3125V2.625C16.3125 2.25 16 1.90625 15.5937 1.90625C15.1875 1.90625 14.875 2.21875 14.875 2.625V3.28125H6.09375V2.625C6.09375 2.25 5.78125 1.90625 5.375 1.90625C4.96875 1.90625 4.65625 2.21875 4.65625 2.625V3.28125H3C1.9375 3.28125 1.03125 4.15625 1.03125 5.25V16.125C1.03125 17.1875 1.90625 18.0938 3 18.0938H18C19.0625 18.0938 19.9687 17.2187 19.9687 16.125V5.25C19.9687 4.1875 19.0625 3.3125 18 3.3125ZM3 4.71875H4.6875V5.34375C4.6875 5.71875 5 6.0625 5.40625 6.0625C5.8125 6.0625 6.125 5.75 6.125 5.34375V4.71875H14.9687V5.34375C14.9687 5.71875 15.2812 6.0625 15.6875 6.0625C16.0937 6.0625 16.4062 5.75 16.4062 5.34375V4.71875H18C18.3125 4.71875 18.5625 4.96875 18.5625 5.28125V7.34375H2.46875V5.28125C2.46875 4.9375 2.6875 4.71875 3 4.71875ZM18 16.6562H3C2.6875 16.6562 2.4375 16.4062 2.4375 16.0937V8.71875H18.5312V16.125C18.5625 16.4375 18.3125 16.6562 18 16.6562Z"
                fill="currentColor"
              />
              <path
                d="M9.5 9.59375H8.8125C8.625 9.59375 8.5 9.71875 8.5 9.90625V10.5938C8.5 10.7812 8.625 10.9062 8.8125 10.9062H9.5C9.6875 10.9062 9.8125 10.7812 9.8125 10.5938V9.90625C9.8125 9.71875 9.65625 9.59375 9.5 9.59375Z"
                fill="currentColor"
              />
              <path
                d="M12.3438 9.59375H11.6562C11.4687 9.59375 11.3438 9.71875 11.3438 9.90625V10.5938C11.3438 10.7812 11.4687 10.9062 11.6562 10.9062H12.3438C12.5312 10.9062 12.6562 10.7812 12.6562 10.5938V9.90625C12.6562 9.71875 12.5312 9.59375 12.3438 9.59375Z"
                fill="currentColor"
              />
              <path
                d="M15.1875 9.59375H14.5C14.3125 9.59375 14.1875 9.71875 14.1875 9.90625V10.5938C14.1875 10.7812 14.3125 10.9062 14.5 10.9062H15.1875C15.375 10.9062 15.5 10.7812 15.5 10.5938V9.90625C15.5 9.71875 15.375 9.59375 15.1875 9.59375Z"
                fill="currentColor"
              />
              <path
                d="M6.5 12H5.8125C5.625 12 5.5 12.125 5.5 12.3125V13C5.5 13.1875 5.625 13.3125 5.8125 13.3125H6.5C6.6875 13.3125 6.8125 13.1875 6.8125 13V12.3125C6.8125 12.125 6.65625 12 6.5 12Z"
                fill="currentColor"
              />
              <path
                d="M9.5 12H8.8125C8.625 12 8.5 12.125 8.5 12.3125V13C8.5 13.1875 8.625 13.3125 8.8125 13.3125H9.5C9.6875 13.3125 9.8125 13.1875 9.8125 13V12.3125C9.8125 12.125 9.65625 12 9.5 12Z"
                fill="currentColor"
              />
              <path
                d="M12.3438 12H11.6562C11.4687 12 11.3438 12.125 11.3438 12.3125V13C11.3438 13.1875 11.4687 13.3125 11.6562 13.3125H12.3438C12.5312 13.3125 12.6562 13.1875 12.6562 13V12.3125C12.6562 12.125 12.5312 12 12.3438 12Z"
                fill="currentColor"
              />
              <path
                d="M15.1875 12H14.5C14.3125 12 14.1875 12.125 14.1875 12.3125V13C14.1875 13.1875 14.3125 13.3125 14.5 13.3125H15.1875C15.375 13.3125 15.5 13.1875 15.5 13V12.3125C15.5 12.125 15.375 12 15.1875 12Z"
                fill="currentColor"
              />
              <path
                d="M6.5 14.4062H5.8125C5.625 14.4062 5.5 14.5312 5.5 14.7187V15.4062C5.5 15.5938 5.625 15.7188 5.8125 15.7188H6.5C6.6875 15.7188 6.8125 15.5938 6.8125 15.4062V14.7187C6.8125 14.5312 6.65625 14.4062 6.5 14.4062Z"
                fill="currentColor"
              />
              <path
                d="M9.5 14.4062H8.8125C8.625 14.4062 8.5 14.5312 8.5 14.7187V15.4062C8.5 15.5938 8.625 15.7188 8.8125 15.7188H9.5C9.6875 15.7188 9.8125 15.5938 9.8125 15.4062V14.7187C9.8125 14.5312 9.65625 14.4062 9.5 14.4062Z"
                fill="currentColor"
              />
              <path
                d="M12.3438 14.4062H11.6562C11.4687 14.4062 11.3438 14.5312 11.3438 14.7187V15.4062C11.3438 15.5938 11.4687 15.7188 11.6562 15.7188H12.3438C12.5312 15.7188 12.6562 15.5938 12.6562 15.4062V14.7187C12.6562 14.5312 12.5312 14.4062 12.3438 14.4062Z"
                fill="currentColor"
              />
            </svg>
          </span>
        </div>
        <div
          v-if="isCalendarOpen"
          id="datepicker-container"
          class="flex w-full flex-col rounded-xl p-4 shadow-four sm:p-[30px] dark:bg-dark-2 dark:shadow-box-dark"
        >
          <div class="flex items-center justify-between pb-4">
            <button
              id="prevMonth"
              @click="handlePrevMonth"
              class="flex h-[38px] w-[38px] cursor-pointer items-center justify-center rounded-[7px] border-[.5px] border-stroke bg-gray-2 text-dark hover:border-primary hover:bg-primary hover:text-white sm:h-[46px] sm:w-[46px] dark:border-dark-3 dark:bg-dark dark:text-white"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="fill-current"
              >
                <path
                  d="M16.2375 21.4875C16.0125 21.4875 15.7875 21.4125 15.6375 21.225L7.16249 12.6C6.82499 12.2625 6.82499 11.7375 7.16249 11.4L15.6375 2.77498C15.975 2.43748 16.5 2.43748 16.8375 2.77498C17.175 3.11248 17.175 3.63748 16.8375 3.97498L8.96249 12L16.875 20.025C17.2125 20.3625 17.2125 20.8875 16.875 21.225C16.65 21.375 16.4625 21.4875 16.2375 21.4875Z"
                />
              </svg>
            </button>
            <span
              id="currentMonth"
              class="text-xl font-medium capitalize text-dark dark:text-white"
            >
              {{
                currentDate.toLocaleDateString('en-US', {
                  month: 'long',
                  year: 'numeric',
                })
              }}
            </span>
            <button
              id="nextMonth"
              class="flex h-[38px] w-[38px] cursor-pointer items-center justify-center rounded-[7px] border-[.5px] border-stroke bg-gray-2 text-dark hover:border-primary hover:bg-primary hover:text-white sm:h-[46px] sm:w-[46px] dark:border-dark-3 dark:bg-dark dark:text-white"
              @click="handleNextMonth"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="fill-current"
              >
                <path
                  d="M7.7625 21.4875C7.5375 21.4875 7.35 21.4125 7.1625 21.2625C6.825 20.925 6.825 20.4 7.1625 20.0625L15.0375 12L7.1625 3.97498C6.825 3.63748 6.825 3.11248 7.1625 2.77498C7.5 2.43748 8.025 2.43748 8.3625 2.77498L16.8375 11.4C17.175 11.7375 17.175 12.2625 16.8375 12.6L8.3625 21.225C8.2125 21.375 7.9875 21.4875 7.7625 21.4875Z"
                />
              </svg>
            </button>
          </div>
          <div
            id="days-of-week"
            class="grid grid-cols-7 pb-2 pt-4 text-sm font-medium capitalize text-body-color sm:text-lg dark:text-dark-6"
          >
            <span class="flex h-[38px] w-[38px] items-center justify-center sm:h-[46px] sm:w-[47px]"
              >Mo</span
            >
            <span class="flex h-[38px] w-[38px] items-center justify-center sm:h-[46px] sm:w-[47px]"
              >Tu</span
            >
            <span class="flex h-[38px] w-[38px] items-center justify-center sm:h-[46px] sm:w-[47px]"
              >We</span
            >
            <span class="flex h-[38px] w-[38px] items-center justify-center sm:h-[46px] sm:w-[47px]"
              >Th</span
            >
            <span class="flex h-[38px] w-[38px] items-center justify-center sm:h-[46px] sm:w-[47px]"
              >Fr</span
            >
            <span class="flex h-[38px] w-[38px] items-center justify-center sm:h-[46px] sm:w-[47px]"
              >Sa</span
            >
            <span class="flex h-[38px] w-[38px] items-center justify-center sm:h-[46px] sm:w-[47px]"
              >Su</span
            >
          </div>
          <div id="days-container" class="grid grid-cols-7 text-sm font-medium sm:text-lg">
            <div
              v-for="(day, idx) in days"
              :key="day !== null ? day : 'empty-' + idx"
              class="flex h-[38px] w-[38px] items-center justify-center rounded-[7px] border-[.5px] border-transparent sm:h-[46px] sm:w-[47px]"
              :class="{
                'text-dark hover:border-stroke hover:bg-gray-2 dark:text-white dark:hover:border-dark-3 dark:hover:bg-dark':
                  day !== null,
                'border-2 !border-gray-50 text-dark rounded-full': isSelected(day),
                'pointer-events-none': day === null,
                'border-2 !border-blue-500 rounded-full': isToday(day) && !isSelected(day),
              }"
              @click="day !== null ? selectDate(day) : null"
            >
              {{ day }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
