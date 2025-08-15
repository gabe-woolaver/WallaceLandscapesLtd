export default function Contact() {
  return (
    <article className="container padding-block contact">
      <header className="narrow">
        <h1>Contact</h1>
        <p className="lead">
          Tell us about your project. This form is ready to hook into any backend or form processor.
        </p>
      </header>

      <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
        <div className="grid-2">
          <div className="field">
            <label htmlFor="name">Name</label>
            <input id="name" name="name" type="text" autoComplete="name" required />
          </div>
          <div className="field">
            <label htmlFor="phone">Phone</label>
            <input id="phone" name="phone" type="tel" autoComplete="tel" />
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" autoComplete="email" required />
          </div>
          <div className="field">
            <label htmlFor="interest">Interested in</label>
            <select id="interest" name="interest">
              <option>Landscaping Services</option>
              <option>Hardscaping Services</option>
              <option>Excavation Services</option>
              <option>Hydroseeding & more</option>
            </select>
          </div>
          <div className="field span-2">
            <label htmlFor="message">Tell us more</label>
            <textarea id="message" name="message" rows="6"></textarea>
          </div>
        </div>
        <button className="button" type="submit">Send message</button>
      </form>
    </article>
  );
}
