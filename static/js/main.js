let mainBanner;
function mainUI() {
  function menuPop() {
    const openBtn = $('.header .btn-menu');
    const menuPop = openBtn.next();
    const closedBtn = menuPop.find('.btn-menu-closed');

    openBtn.on('click', function () {
      $(this).closest('.main').addClass('popup');
      menuPop.css({ display: 'block' });
    });
    closedBtn.on('click', function () {
      $(this).closest('.menu-list-box').css({ display: 'none' });
      $(this).closest('.main').removeClass('popup');
    });
  }

  const mainBanner = new Swiper('.main-swiper', {
    loop: true,
    preventInteractionOnTransition: false,
    pagination: true,
    paginationClickable: true
  });

  const workSlider = new Swiper('.small-swiper', {
    slidesPerView: 'auto'
  });

  const wrapper = document.querySelector('#container');
  const dragElement = document.querySelector('.main-slide-wrap');
  const cateList = document.querySelector('.contents-box');
  const btnMenu = document.querySelector('.contents-group-box .btn-open-career');
  let isDragging = false;
  let initialY;

  wrapper.addEventListener('mousedown', handleMouseDown);
  dragElement.addEventListener('touchstart', handleTouchStart);
  dragElement.addEventListener('wheel', handleWheel);

  document.addEventListener('mousemove', handleDrag);
  document.addEventListener('touchmove', handleTouchMove);

  document.addEventListener('mouseup', handleMouseUp);
  document.addEventListener('touchend', handleTouchEnd);

  btnMenu.addEventListener('click', menuToggle);
  //btnMenu.addEventListener('touchend', menuToggle);

  function menuToggle() {
    if (wrapper.classList.contains('active')) {
      wrapper.classList.remove('active');
    } else {
      wrapper.classList.add('active');
    }
  }

  function handleWheel(e) {
    // 휠을 아래로 내렸을 때 isDragging을 true로 설정
    if (e.deltaY > 0) {
      wrapper.classList.add('active');
    } else {
      wrapper.classList.remove('active');
    }
  }

  function handleMouseDown(e) {
    // 마우스 왼쪽 버튼(버튼 코드: 0)에 대한 클릭만 처리
    if (e.button === 0) {
      e.preventDefault();
      isDragging = true;
      initialY = e.clientY;
    }
  }

  function handleTouchStart(e) {
    e.preventDefault();
    isDragging = true;
    initialY = e.touches[0].clientY;
  }

  function handleDrag(e) {
    if (isDragging) {
      let currentY = e.clientY;
      handleDragMovement(currentY);
    }
  }

  function handleTouchMove(e) {
    if (isDragging) {
      let currentY = e.touches[0].clientY;
      handleDragMovement(currentY);
    }
  }

  function handleMouseUp() {
    isDragging = false;
  }

  function handleTouchEnd() {
    isDragging = false;
  }

  function handleDragMovement(currentY) {
    let deltaY = currentY - initialY;

    console.log(currentY, deltaY);

    if (isInsideCateList(currentY)) {
      isDragging = false;
    }

    if (deltaY > 100) {
      wrapper.classList.remove('active');
    } else if (deltaY < -100) {
      wrapper.classList.add('active');
    }
  }

  function isInsideCateList(currentY) {
    const cateListRect = cateList.getBoundingClientRect();
    return currentY >= cateListRect.top && currentY <= cateListRect.bottom;
  }

  menuPop();
}
