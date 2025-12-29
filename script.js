document.addEventListener('DOMContentLoaded', function () {

    // --- MODAL LOGIC ---
    // General function to open any modal
    const openModal = (modal) => {
        if (modal) modal.classList.add('active');
    };

    // General function to close any modal
    const closeModal = (modal) => {
        if (modal) modal.classList.remove('active');
    };

    // --- Policy Modals ---
    // This functionality has been moved to separate pages (privacy.html, refund.html)

    // --- Product Detail Modal ---
    const productDetailModal = document.getElementById('product-detail-modal');

    // Placeholder data
    const productData = {
        'premium-leather-briefcase': {
            title: 'Premium Leather Briefcase',
            price: 'Rs. 15,000',
            description: 'A placeholder description for the elegant and durable Premium Leather Briefcase, designed for the modern professional.',
            dimensions: '15in x 11in x 3in',
            materials: 'Full-grain calfskin leather, brass hardware, cotton lining.',
            image: 'Image/Premium_Leather_Briefcase_Front.png',
            images: [
                'Image/Premium_Leather_Briefcase_Front.png',
                'Image/Premium_Leather_Briefcase_Back.png',
                'Image/Premium_Leather_Briefcase_Open.png'
            ]
        },
        'peggy-tan-leather-bag': {
            title: 'Tan Leather Bag',
            price: 'Rs. 9,500',
            description: 'A placeholder description for this stylish tan leather bag, a perfect and versatile companion for your everyday adventures.',
            dimensions: '12in x 9in x 4in',
            materials: 'High-quality goat leather, silver-tone fittings.',
            image: 'Image/Peggy_Tan_Leather_Bag_Full_Front.png',
            images: [
                'Image/Peggy_Tan_Leather_Bag_Full_Front.png',
                'Image/Peggy_Tan_Leather_Bag_Full_Front_Side.png',
                'Image/Peggy_Tan_Leather_Bag_Side.png',
                'Image/Peggy_Tan_Leather_Bag_Back.png'
            ]
        },
        'exclusive-fashion-handbag': {
            title: 'Underarm Leather Handbag',
            price: 'Rs. 12,000',
            description: 'A placeholder description for this exquisite handbag, designed to make a statement with its unique shape and premium finish.',
            dimensions: '10in x 6in x 2.5in',
            materials: 'Pebbled top-grain leather, magnetic clasp.',
            image: 'Image/Underarm_Leather_Handbag_Front.png',
            images: [
                'Image/Underarm_Leather_Handbag_Front.png',
                'Image/Underarm_Leather_Handbag_Side_Front.png',
                'Image/Underarm_Leather_Handbag_Side.png',
                'Image/Underarm_Leather_Handbag_Back.png'
            ]
        }
    };

    const viewDetailsButtons = document.querySelectorAll('.btn[data-product-id]');

    // Modal Elements for Slider
    const modalImage = document.getElementById('modal-product-image');
    const prevBtn = document.querySelector('.modal-slider-btn.prev');
    const nextBtn = document.querySelector('.modal-slider-btn.next');

    let currentModalImages = [];
    let currentModalIndex = 0;

    const updateModalImage = () => {
        if (currentModalImages.length > 0) {
            modalImage.src = currentModalImages[currentModalIndex];
        }
    };

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            currentModalIndex = (currentModalIndex - 1 + currentModalImages.length) % currentModalImages.length;
            updateModalImage();
        });

        nextBtn.addEventListener('click', () => {
            currentModalIndex = (currentModalIndex + 1) % currentModalImages.length;
            updateModalImage();
        });
    }

    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const productId = this.getAttribute('data-product-id');
            const data = productData[productId];

            if (data) {
                // Setup Images
                if (data.images && data.images.length > 1) {
                    currentModalImages = data.images;
                    currentModalIndex = 0;
                    modalImage.src = currentModalImages[0];
                    if (prevBtn) prevBtn.style.display = 'block';
                    if (nextBtn) nextBtn.style.display = 'block';
                } else {
                    currentModalImages = [];
                    modalImage.src = data.image;
                    if (prevBtn) prevBtn.style.display = 'none';
                    if (nextBtn) nextBtn.style.display = 'none';
                }

                document.getElementById('modal-product-title').textContent = data.title;
                document.getElementById('modal-product-price').textContent = data.price;
                document.getElementById('modal-product-description').textContent = data.description;
                document.getElementById('modal-product-dimensions').textContent = data.dimensions;
                document.getElementById('modal-product-materials').textContent = data.materials;
                openModal(productDetailModal);
            }
        });
    });

    // --- General Close Logic for All Modals ---
    const allCloseButtons = document.querySelectorAll('.close-button');
    allCloseButtons.forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.modal').forEach(modal => closeModal(modal));
        });
    });

    window.addEventListener('click', (e) => {
        document.querySelectorAll('.modal').forEach(modal => {
            if (e.target === modal) {
                closeModal(modal);
            }
        });
    });


    // --- MOBILE NAVIGATION ---
    const navToggle = document.querySelector('.nav-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
        });
    }

    // Close mobile nav when a link is clicked
    mainNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
            }
        });
    });

    // --- CONTACT FORM SUBMISSION ---
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Stop the form from submitting the traditional way

            const formData = new FormData(contactForm);
            const result = document.getElementById('result');

            result.textContent = "Sending...";
            result.className = "form-result active";

            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            })
                .then(async (response) => {
                    const json = await response.json();
                    if (response.status == 200) {
                        result.textContent = json.message;
                        result.classList.remove('error');
                        result.classList.add('success');
                        contactForm.reset();
                    } else {
                        console.log(response);
                        result.textContent = json.message;
                        result.classList.remove('success');
                        result.classList.add('error');
                    }
                })
                .catch(error => {
                    console.log(error);
                    result.textContent = "Something went wrong!";
                    result.classList.remove('success');
                    result.classList.add('error');
                })
                .then(function () {
                    // Hide message after 5 seconds
                    setTimeout(() => {
                        result.classList.remove('active');
                        result.textContent = "";
                        result.className = "form-result"; // Reset classes
                    }, 5000);
                });
        });
    }



});
