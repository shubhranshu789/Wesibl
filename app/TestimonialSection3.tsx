import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Adobe Experience Manager",
    role: "",
    company: "ADOBE",
    content: "Wesibl Technologies stands out with their exceptional talent and expertise. Their ability to think outside the box and bring unique ideas to life is truly impressive.",
    image: "/testimonial/Adobe.png?img=1"
  },
  {
    id: 2,
    name: "AWS Partner Network",
    role: "",
    company: "Amazon",
    content: "They’ve implemented AWS solutions with best-in-class security standards, ensuring clients operate with confidence. Their use of AWS services to build scalable, secure, and high-performance solutions showcases true cloud-native excellence.",
    image: "/testimonial/amazon.png?img=2"
  },
  {
    id: 3,
    name: "Microsft Azure Cloud Solutions",
    role: "",
    company: "MICROSOFT",
    content: "As a valued Microsoft Azure partner, their team has consistently delivered enterprise-grade solutions with remarkable efficiency.",
    image: "/testimonial/Azure.png?img=3"
  },
  {
    id: 4,
    name: "Google Cloud Support",
    role: "",
    company: "GOOGLE",
    content: "It’s a pleasure to support such a forward-thinking team. Their collaborative approach and clear understanding of Google Cloud capabilities make them an invaluable partner in driving customer success.",
    image: "/testimonial/google.png?img=4"
  },
  
];

const TestimonialSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const getTestimonialIndex = (offset: number) => {
    const index = currentIndex + offset;
    if (index < 0) return testimonials.length + index;
    if (index >= testimonials.length) return index - testimonials.length;
    return index;
  };

  return (
    <section className="testimonial-section">
      <div className="container">
        <h2 className="section-title">What Our Clients Say</h2>
        <p className="section-subtitle">Don't just take our word for it</p>

        <div className="carousel-wrapper">
          {/* Left navigation button */}
          <button onClick={prevTestimonial} className="nav-button nav-left">
            <ChevronLeft size={28} />
          </button>

          <div className="carousel-container">
            {/* Left testimonial (blurred) */}
            <div className="testimonial-card testimonial-left">
              <TestimonialCard testimonial={testimonials[getTestimonialIndex(-1)]} />
            </div>

            {/* Center testimonial (focused) */}
            <div className="testimonial-card testimonial-center">
              <TestimonialCard testimonial={testimonials[currentIndex]} />
            </div>

            {/* Right testimonial (blurred) */}
            <div className="testimonial-card testimonial-right">
              <TestimonialCard testimonial={testimonials[getTestimonialIndex(1)]} />
            </div>
          </div>

          {/* Right navigation button */}
          <button onClick={nextTestimonial} className="nav-button nav-right">
            <ChevronRight size={28} />
          </button>
        </div>

        {/* Indicators */}
        <div className="indicators">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`indicator ${index === currentIndex ? 'active' : ''}`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .testimonial-section {
          background: white;
          padding: 80px 20px;
          overflow: hidden;
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
        }

        .section-title {
          text-align: center;
          font-size: 2.5rem;
          font-weight: 700;
          background: linear-gradient(135deg, #e91e8c 0%, #5b4bff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 12px;
        }

        .section-subtitle {
          text-align: center;
          font-size: 1.125rem;
          color: #666;
          margin-bottom: 60px;
        }

        .carousel-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 40px;
          margin-bottom: 40px;
        }

        .carousel-container {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 30px;
          min-height: 400px;
          flex: 1;
          max-width: 1200px;
        }

        .testimonial-card {
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .testimonial-left,
        .testimonial-right {
          filter: blur(4px);
          opacity: 0.4;
          transform: scale(0.85);
          pointer-events: none;
        }

        .testimonial-center {
          filter: blur(0);
          opacity: 1;
          transform: scale(1);
          z-index: 10;
        }

        .nav-button {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          border: none;
          background: linear-gradient(135deg, #e91e8c 0%, #5b4bff 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          color: white;
          box-shadow: 0 4px 15px rgba(233, 30, 140, 0.3);
          flex-shrink: 0;
        }

        .nav-button:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 20px rgba(233, 30, 140, 0.5);
        }

        .nav-button:active {
          transform: scale(0.95);
        }

        .nav-left {
          margin-right: 20px;
        }

        .nav-right {
          margin-left: 20px;
        }

        .indicators {
          display: flex;
          justify-content: center;
          gap: 10px;
        }

        .indicator {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          border: none;
          background: #d0d0d0;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .indicator.active {
          background: linear-gradient(135deg, #e91e8c 0%, #5b4bff 100%);
          width: 30px;
          border-radius: 5px;
        }

        @media (max-width: 1024px) {
          .testimonial-left,
          .testimonial-right {
            display: none;
          }

          .carousel-container {
            gap: 0;
          }

          .carousel-wrapper {
            gap: 20px;
          }

          .nav-button {
            width: 50px;
            height: 50px;
          }
        }

        @media (max-width: 768px) {
          .section-title {
            font-size: 2rem;
          }

          .carousel-container {
            min-height: 350px;
          }

          .carousel-wrapper {
            gap: 15px;
          }

          .nav-button {
            width: 45px;
            height: 45px;
          }

          .nav-left {
            margin-right: 0;
          }

          .nav-right {
            margin-left: 0;
          }
        }
      `}</style>
    </section>
  );
};

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => {
  return (
    <div className="card">
      <div className="quote-icon">"</div>
      <p className="content">{testimonial.content}</p>
      <div className="author-section">
        <img src={testimonial.image} alt={testimonial.name} className="avatar" />
        <div className="author-info">
          <h4 className="name">{testimonial.name}</h4>
          <p className="role">{testimonial.role}  {testimonial.company}</p>
        </div>
      </div>

      <style jsx>{`
        .card {
          background: white;
          border-radius: 20px;
          padding: 40px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
          max-width: 600px;
          width: 100%;
          position: relative;
          border: 1px solid #f0f0f0;
        }

        .quote-icon {
          font-size: 80px;
          background: linear-gradient(135deg, #e91e8c 0%, #5b4bff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
          margin-bottom: 20px;
          font-family: Georgia, serif;
          opacity: 0.3;
        }

        .content {
          font-size: 1.125rem;
          line-height: 1.8;
          color: #333;
          margin-bottom: 30px;
          font-style: italic;
        }

        .author-section {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid transparent;
          background: linear-gradient(white, white) padding-box,
                      linear-gradient(135deg, #e91e8c 0%, #5b4bff 100%) border-box;
        }

        .author-info {
          flex: 1;
        }

        .name {
          font-size: 1.125rem;
          font-weight: 600;
          color: #1a1a1a;
          margin: 0 0 4px 0;
        }

        .role {
          font-size: 0.9rem;
          color: #666;
          margin: 0;
        }

        @media (max-width: 768px) {
          .card {
            padding: 30px 20px;
          }

          .content {
            font-size: 1rem;
          }

          .quote-icon {
            font-size: 60px;
          }
        }
      `}</style>
    </div>
  );
};

export default TestimonialSection;
