import { contact, modernCopy } from "../../data/index.js";

export default function ModernContact() {
  return (
    <section id="contact" className="contact">
      <div className="label">Say hello</div>
      <h2>Let’s build something together</h2>
      <p>{modernCopy.contactBlurb}</p>
      <div className="btns">
        <a className="btn p" href={`mailto:${contact.email}`}>{contact.email}</a>
        <a className="btn" href={`tel:${contact.phoneHref}`}>{contact.phone}</a>
      </div>
    </section>
  );
}
