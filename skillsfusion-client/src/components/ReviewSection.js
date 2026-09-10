import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css'; // Bootstrap Icons
import './ReviewSection.css'; // Optimized CSS

const ReviewsSection = () => {
  const reviews = [
    {
      id: 1,
      name: "Chandu",
      field: "Web Development",
      rating: 4.5,
      review: "Outstanding work on our e-commerce platform. The code quality is exceptional and the project was delivered ahead of schedule. Highly professional and responsive throughout the entire process.",
      avatar: "M",
      date: "2 weeks ago"
    },
    {
      id: 2,
      name: "Syamanth",
      field: "Mobile App Development",
      rating: 3.5,
      review: "Incredible attention to detail in our React Native app. The UI/UX implementation was pixel-perfect and the performance optimizations exceeded our expectations. Will definitely work again!",
      avatar: "S",
      date: "1 month ago"
    },
    {
      id: 3,
      name: "Meher",
      field: "UI/UX Design",
      rating: 5,
      review: "Great design skills and creative approach to our brand identity project. The mockups were clean and modern. Communication could be improved, but the final deliverables were top-notch.",
      avatar: "C",
      date: "3 weeks ago"
    },
    {
      id: 4,
      name: "Hari",
      field: "Backend Development",
      rating: 3.5,
      review: "Solid backend architecture and API development. The database optimization and security implementations were exactly what we needed. Very knowledgeable and reliable developer.",
      avatar: "H",
      date: "1 week ago"
    },
    {
      id: 5,
      name: "kalyan",
      field: "AI/ML Projects",
      rating: 4,
      review: "Delivered a high-quality machine learning model for our healthcare project. The documentation and model performance were impressive. Timely delivery and clear communication throughout.",
      avatar: "A",
      date: "5 days ago"
    }
  ];

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div className="stars">
        {[...Array(fullStars)].map((_, i) => (
          <i key={`full-${i}`} className="bi bi-star-fill star-icon full"></i>
        ))}
        {halfStar && <i className="bi bi-star-half star-icon half"></i>}
        {[...Array(emptyStars)].map((_, i) => (
          <i key={`empty-${i}`} className="bi bi-star star-icon empty"></i>
        ))}
      </div>
    );
  };

  const getAverageRating = () => {
    const total = reviews.reduce((sum, r) => sum + r.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  return (
    <div className="review-wrapper">
      <div className="reviews-container">
        <div className="reviews-header">
          <h2 className="section-title">Client Reviews</h2>
          <p className="section-subtitle">
            Don't just take my word for it. Here's what my clients have to say about working with me.
          </p>
          <div className="rating-summary">
            {renderStars(getAverageRating())}
            <span className="average-rating">{getAverageRating()}</span>
            <span className="review-count">({reviews.length} reviews)</span>
          </div>
        </div>

        <div className="reviews-grid">
          {reviews.map((review) => (
            <div key={review.id} className="review-card">
              <div className="review-header">
                <div className="reviewer-info">
                  <div className="avatar">{review.avatar}</div>
                  <div>
                    <h4 className="reviewer-name">{review.name}</h4>
                    <p className="reviewer-field">{review.field}</p>
                  </div>
                </div>
                <div className="review-meta">
                  {renderStars(review.rating)}
                  <span className="review-date">{review.date}</span>
                </div>
              </div>
              <p className="review-text">"{review.review}"</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewsSection;
