/**
 * Main application script
 * Initializes carousel component with swipe functionality
 */

// Імпортуємо SwipeCarousel з модуля carousel та дефолтні налаштування
import SwipeCarousel from './carousel/index.js'
import { DEFAULT_SETTINGS } from './carousel/helpers/config.js'
import { logCarouselSettings } from './carousel/helpers/utils.js'

// Налаштування карусельки з перевизначенням дефолтних значень
const carouselConfig = {
  // Базові налаштування
  containerId: '#carousel',
  slideId: '.slide',
  interval: 3000,
  isPlaying: true,

  // Додаткові налаштування для свайпу
  swipeThreshold: 80, // Зменшене значення для легшої зміни слайдів

  // Поведінкові налаштування
  pauseOnHover: true
}

// Виводимо інформацію про налаштування в консоль
logCarouselSettings(carouselConfig, DEFAULT_SETTINGS)

// Створюємо екземпляр карусельки
const carousel = new SwipeCarousel(carouselConfig)

// Ініціалізуємо карусельку
carousel.init()

// Опціонально: можна експортувати екземпляр для використання в інших модулях
export default carousel
