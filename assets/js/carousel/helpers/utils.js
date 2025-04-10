/**
 * Utility functions for carousel
 * @description Helper functions for debugging and development
 */

/**
 * Logs carousel settings to the console in a formatted way
 * @param {Object} customSettings - User provided settings
 * @param {Object} defaultSettings - Default settings from config
 */
export function logCarouselSettings(customSettings, defaultSettings) {
  // Об'єднуємо дефолтні та користувацькі налаштування
  const appliedSettings = { ...defaultSettings, ...customSettings }

  // Виводимо налаштування у форматованому вигляді
  console.log('Налаштування карусельки:')
  console.table(appliedSettings)

  // Виводимо кольоровий заголовок у консоль
  console.log(
    '%c Налаштування, які відрізняються від дефолтних: ',
    'background: #4CAF50; color: white; padding: 4px 8px; border-radius: 4px;'
  )

  // Виводимо змінені налаштування
  Object.keys(customSettings).forEach((key) => {
    if (defaultSettings[key] !== undefined && defaultSettings[key] !== customSettings[key]) {
      console.log(
        `%c${key}:%c ${defaultSettings[key]} → %c${customSettings[key]}`,
        'color: #777; font-weight: bold',
        'color: #999',
        'color: #4CAF50; font-weight: bold'
      )
    } else if (defaultSettings[key] === undefined) {
      console.log(
        `%c${key}:%c ${customSettings[key]} %c(нове налаштування)`,
        'color: #777; font-weight: bold',
        'color: #4CAF50; font-weight: bold',
        'color: #F57C00; font-style: italic'
      )
    }
  })
}

/**
 * Helper function to measure carousel performance
 * @param {string} name - Name of the operation being measured
 * @param {Function} callback - Function to execute and measure
 * @returns {*} - Return value from the callback
 */
export function measurePerformance(name, callback) {
  console.time(`Carousel Performance: ${name}`)
  const result = callback()
  console.timeEnd(`Carousel Performance: ${name}`)
  return result
}

export default {
  logCarouselSettings,
  measurePerformance
}
