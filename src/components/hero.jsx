function Hero({ title = 'Empowering minds through elegant software design', description = 'Modern enterprise architectures and scalable consumer tools engineered with performance, logic, and precision.', children }) {
  return (
    <div className="hero-badge" aria-label="Yash12007 software solutions">
      <span aria-hidden="true">✦</span> {title} {children && <span>{description}</span>}
    </div>
  );
}

export default Hero;
