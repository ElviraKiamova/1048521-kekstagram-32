const IMAGE_ZOOM_STEP = 25;
const MAXIMUM_IMAGE_MAGNIFICATION = 100;
const sliderElement = document.querySelector('.img-upload__effect-level');
const effectsList = document.querySelector('.effects__list');
const previewPhoto = document.querySelector('.img-upload__preview img');
const scaleControlValue = document.querySelector('.scale__control--value');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 0,
  step: 0.1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

const imageEffects = [
  {
    name: 'chrome',
    view: 'grayscale',
    part: '',
    minSlider: 0,
    maxSlider: 1,
    startSlider: 1,
    stepSlider: 0.1,
  },
  {
    name: 'sepia',
    view: 'sepia',
    part: '',
    minSlider: 0,
    maxSlider: 1,
    startSlider: 1,
    stepSlider: 0.1,
  },
  {
    name: 'marvin',
    view: 'invert',
    part: '%',
    minSlider: 0,
    maxSlider: 100,
    startSlider: 100,
    stepSlider: 1,
  },
  {
    name: 'phobos',
    view: 'blur',
    part: 'px',
    minSlider: 0,
    maxSlider: 3,
    startSlider: 3,
    stepSlider: 0.1,
  },
  {
    name: 'heat',
    view: 'brightness',
    part: '',
    minSlider: 1,
    maxSlider: 3,
    startSlider: 3,
    stepSlider: 0.1,
  },
];


/**
 * Функция для добавления эффектов картинке
 * @param {number} number - данные полля ввода
 * @param {array} list - массив эффектов
 */
const addStylePicture = (number, list) => {
  const inputChecked = effectsList.querySelector('input:checked');
  if (inputChecked.id === 'effect-none') {
    previewPhoto.style.filter = 'none';
  }
  list.forEach((item) => {
    const {name, view, part} = item;
    if (inputChecked.id === `effect-${name}`) {
      previewPhoto.style.filter = `${view}(${number}${part})`;
    }
  });
};

/**
 * Функция добавления слайдера на каждый эффект картинки
 * @param {object} evt - данные изображения
 */
const changeSliderEffect = (evt) => {
  if (evt.target.id === 'effect-none') {
    sliderElement.classList.add('hidden');
    sliderElement.noUiSlider.set(0);
  }
  imageEffects.forEach((item) => {
    const {name, minSlider, maxSlider, startSlider, stepSlider} = item;
    if (evt.target.id === `effect-${name}`) {
      sliderElement.classList.remove('hidden');
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: minSlider,
          max: maxSlider,
        },
        start: startSlider,
        step: stepSlider,
      });
    }
  });
};


/**
 * Функция уменьшения масштаба загруженной картинки
 */
const handlerDecreaseImage = () => {
  const valueSlice = +scaleControlValue.value.slice(0, -1);
  if (valueSlice > IMAGE_ZOOM_STEP) {
    scaleControlValue.value = `${valueSlice - IMAGE_ZOOM_STEP}%`;
    previewPhoto.style.transform = `scale(${(valueSlice - IMAGE_ZOOM_STEP) / 100})`;
  }
};

/**
 * Функция увеличения масштаба загруженной картинки
 */
const handlerIncreaseImage = () => {
  const valueSlice = +scaleControlValue.value.slice(0, -1);
  if (valueSlice <= (MAXIMUM_IMAGE_MAGNIFICATION - IMAGE_ZOOM_STEP)) {
    scaleControlValue.value = `${+valueSlice + IMAGE_ZOOM_STEP}%`;
    previewPhoto.style.transform = `scale(${(valueSlice + IMAGE_ZOOM_STEP) / 100})`;
  }
  if (valueSlice > (MAXIMUM_IMAGE_MAGNIFICATION - IMAGE_ZOOM_STEP)) {
    previewPhoto.style.transform = 'scale(1)';
  }
};

export {addStylePicture, changeSliderEffect, handlerDecreaseImage, handlerIncreaseImage, imageEffects, sliderElement, effectsList, previewPhoto, scaleControlValue};
