document.addEventListener("DOMContentLoaded", function () {
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    scrollLinks.forEach(link => {
        link.addEventListener('click', smoothScroll);
    });

    const projectFilter = document.getElementById('project-filter');
    const projects = document.querySelectorAll('.project');

    projectFilter.addEventListener('change', filterProjects);

    function smoothScroll(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scroll({
                top: targetElement.offsetTop - 60,
                left: 0,
                behavior: 'smooth'
            });
        }
    }

    function filterProjects() {
        const selectedCategory = projectFilter.value;

        projects.forEach(project => {
            const categories = project.getAttribute('data-categories').split(',');

            if (selectedCategory === 'all' || categories.includes(selectedCategory)) {
                project.style.display = 'block';
            } else {
                project.style.display = 'none';
            }
        });
    }
});
