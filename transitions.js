document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.container');
  const formSection = document.querySelector('.form-section');
  const imageSection = document.querySelector('.image-section');

  // منع الرمشة عند التحميل
  document.body.style.opacity = '0';

  // تهيئة الصفحة
  function initPage() {
    const isSignup = window.location.pathname.includes('signup.html');

    // تعيين الاتجاه الصحيح
    if (isSignup) {
      container.classList.add('signup-mode');
    }

    // إظهار الصفحة بشكل تدريجي
    setTimeout(() => {
      document.body.style.opacity = '1';
      container.classList.add('loaded');
      formSection.classList.add('loaded');
      imageSection.classList.add('loaded');
    }, 50);
  }

  // معالجة الانتقال
  function handleTransition(e) {
    e.preventDefault();

    if (container.classList.contains('transitioning')) return;

    const targetUrl = e.currentTarget.href;
    container.classList.add('transitioning');

    // تخزين حالة الانتقال
    sessionStorage.setItem('pageTransition', 'true');

    // تحريكات الخروج
    container.classList.add('exit');

    // الانتقال للصفحة الجديدة
    setTimeout(() => {
      window.location.href = targetUrl;
    }, 500);
  }

  // إضافة معالجات الأحداث
  document.querySelectorAll('a[href*="html"]').forEach(link => {
    link.addEventListener('click', handleTransition);
  });

  // بدء التحريكات
  initPage();
});
