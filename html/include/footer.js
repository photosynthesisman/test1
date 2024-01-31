function includeFooter() {
  let str = `
<footer id="footer" class="footer">
  <div class="inner">
    <div class="logo"><a href="main.html" role="button"></a></div>
    <div class="f-menu-list">
      <ol>
        <li class="menu-cell"><a href="#none" role="button">About</a></li>
        <li class="menu-cell"><a href="#none" role="button">Work</a></li>
        <li class="menu-cell"><a href="#none" role="button">News</a></li>
        <li class="menu-cell"><a href="#none" role="button">Contact</a></li>
      </ol>
    </div>
    <div class="f-info-grp">
      <div class="info-box">
        <div class="tit">Office</div>
        <div class="txt">
          6F E-605, SK V1 Center,<br />
          11 Dangsan-ro 41-gil,<br />
          Yeongdeugpo-gu, Seoul
        </div>
      </div>
      <div class="info-box">
        <div class="tit">Contact</div>
        <div class="txt">
          <a href="tel:0226753397">T 02-2675-3397</a>
          <a href="tel:0226753387">F 02-2675-3387</a>
          <a href="mailto:jykim@hiuxc.com">E jykim@hiuxc.com</a>
        </div>
      </div>
    </div>
    <span class="copyright">&copy; 2024 HiUX Consulting. All Rights Reserved.</span>
  </div>
</footer>
<div class="scroll-top"><button type="button" class="btn-scroll-top" aria-label="페이지 상단으로 이동"></button></div>`;
  document.write(str);
  const $include = document.querySelector('.__include');
  if ($include) $include.remove();
}
includeFooter();
