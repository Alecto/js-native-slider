/* eslint-disable */
/* prettier-ignore */


/*

  constructor(p) {
    const settings = {...{containerId: '#carousel', interval: 5000, isPlaying: true, slideId: '.slide'}, ...p};
    const settings = this._initConfig(params);
  }


  _initConfig(objectWithInnerParams) {

    ! Вариант 1
    const defaultSettings = {
      containerID: '#carousel',
      interval: 5000,
      slideID: '.slide',
      isPlaying: true
    };

    const resultObject = {};

    if (objectWithInitParams === undefined) {
      return defaultSetting;
    }

    resultObject.containerID = objectWithInnerParams.containerID || defaultSetting.containerID;
    resultObject.slideID = objectWithInnerParams.slideID || defaultSetting.slideID;
    resultObject.interval = objectWithInnerParams.interval || defaultSetting.interval;
    resultObject.isPlaying = objectWithInnerParams.isPlaying || defaultSetting.isPlaying;

    return resultObject;


    ! Вариант 2
    const p = {containerID: '#carousel', slideID: '.slide', interval: 5000, isPlaying: true};
    return {...p, ...o};


    ! Вариант 3
    return {...{containerID: '#carousel', interval: 5000, slideID: '.slide'}, ...o};
  }


  ! Вариант 4 - переписать метод через стрелочную функцию (ругается линтер, но работает)
  _initConfig = (o) => ({...{containerID: '#carousel', interval: 5000, slideID: '.slide'}, ...o})

 */
