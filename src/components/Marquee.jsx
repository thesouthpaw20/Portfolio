import { marqueeItems } from '../data/content.js';
import '../styles/Marquee.css';

/**
 * Infinite skills band. The item list is rendered twice inside one track so the
 * -50% translate loops seamlessly; the duplicate is hidden from assistive tech.
 */
export default function Marquee() {
  return (
    <div className="marquee" aria-label="Core tools and methods">
      <div className="marquee__track">
        {[0, 1].map((copy) => (
          <ul className="marquee__list" key={copy} aria-hidden={copy === 1}>
            {marqueeItems.map((item) => (
              <li className="marquee__item" key={`${copy}-${item}`}>
                <span className="marquee__mark" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
