let mainBanner;

function mainUI() {
  const wrapper = document.querySelector('#container');
  const dragElement = document.querySelector('.main-slide-wrap');
  const cateList = document.querySelector('.contents-box');
  const btnMenu = document.querySelector('.contents-group-box .btn-open-career');
  let isDragging = false;
  let initialY;

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

  function scrollTop() {
    const scrollArea = $('.contents-group-box .inner');
    const scrollBtn = $('.scroll-top');
    const btn = scrollBtn.children();

    scrollBtn.hide();

    scrollArea.scroll(function () {
      if ($(this).scrollTop() > 100) {
        scrollBtn.fadeIn();
      } else if (scrollArea.scrollTop() <= 0) {
        // 스크롤 0 일때 닫기
        setTimeout(function () {
          wrapper.classList.remove('active');
        }, 100);
      } else {
        scrollBtn.fadeOut();
      }
    });

    btn.on('click', function () {
      scrollArea.animate(
        {
          scrollTop: 0
        },
        800,
        function () {
          $(this).closest('#container').removeClass('active');
        }
      );
    });
  }

  const mainBanner = new Swiper('.main-swiper', {
    loop: true,
    preventInteractionOnTransition: false,
    pagination: true,
    paginationClickable: true
  });

  const workSlider = new Swiper('.small-swiper', {
    slidesPerView: 'auto',
    breakpoints: {
      '@1.50': {
        slidesPerView: 3.8
      }
    }
  });

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
    const direction = e.deltaY > 0 ? 'down' : 'up';
    wrapper.classList.toggle('active', direction === 'down');
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
      const { clientX, clientY } = e.touches[0];
      e.preventDefault(); // iOS에서의 새로고침 방지
      handleDragMovement(clientX, clientY);
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
  scrollTop();
}
