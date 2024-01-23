let mainBanner;
function mainUI() {
  const mainBanner = new Swiper('.main-swiper', {
    loop: true,
    preventInteractionOnTransition: false,
    pagination: true,
    paginationClickable: true
  });

  // const workSlider = new Swiper('.workSlider', {
  //   slidesPerView: 'auto'
  // });

  const wrapper = document.querySelector('#wrapper');
  const dragElement = document.querySelector('#container');
  const cateList = document.querySelector('.career-box');
  const btnMenu = document.querySelector('.career-group-box .btn-open-career');
  let isDragging = false;
  let initialX;
  let initialY;

  wrapper.addEventListener('mousedown', handleMouseDown);
  dragElement.addEventListener('touchstart', handleTouchStart);
  dragElement.addEventListener('wheel', handleWheel);

  document.addEventListener('mousemove', handleDrag);
  document.addEventListener('touchmove', handleTouchMove);

  document.addEventListener('mouseup', handleMouseUp);
  document.addEventListener('touchend', handleTouchEnd);

  btnMenu.addEventListener('click', menuToggle);
  btnMenu.addEventListener('touchend', menuToggle);

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
      initialX = e.clientX;
      initialY = e.clientY;
    }
  }

  function handleTouchStart(e) {
    e.preventDefault();
    isDragging = true;
    initialX = e.touches[0].clientX;
    initialY = e.touches[0].clientY;
  }

  function handleDrag(e) {
    if (isDragging) {
      let currentX = e.clientX;
      let currentY = e.clientY;
      handleDragMovement(currentX, currentY);
    }
  }

  function handleTouchMove(e) {
    if (isDragging) {
      let currentX = e.touches[0].clientX;
      let currentY = e.touches[0].clientY;
      handleDragMovement(currentX, currentY);
    }
  }

  function handleMouseUp() {
    isDragging = false;
  }

  function handleTouchEnd() {
    isDragging = false;
  }

  function handleDragMovement(currentX, currentY) {
    let deltaX = currentX - initialX;
    let deltaY = currentY - initialY;

    console.log(currentX, deltaX, currentY, deltaY);

    if (isInsideCateList(currentX, currentY)) {
      isDragging = false;
    }

    if (deltaY > 100) {
      wrapper.classList.remove('active');
    } else if (deltaY < -100) {
      wrapper.classList.add('active');
    }
  }

  function isInsideCateList(currentX, currentY) {
    const cateListRect = cateList.getBoundingClientRect();
    return currentY >= cateListRect.top && currentY <= cateListRect.bottom;
  }
}
