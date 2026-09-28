'use client';

/**
 * Renders a lesson's body text.
 *
 * Lesson content is written as plain text with blank lines between paragraphs
 * and **bold** for sub-headings. That is enough structure for what lessons
 * need, and it keeps authoring in curriculum.js readable.
 *
 * Deliberately not a markdown library and deliberately not
 * dangerouslySetInnerHTML: lesson content will eventually be editable through
 * the app, and rendering author-supplied text as raw HTML is how you get
 * stored XSS. Everything here goes through React as text nodes.
 */

// Splits a line on **bold** runs and returns React nodes.
function renderInline(line, keyPrefix) {
  return line.split(/(\*\*[^*]+\*\*)/g).map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
      return (
        <strong key={`${keyPrefix}-${i}`} className="font-semibold text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

export default function LessonContent({ content }) {
  if (!content) return null;

  const paragraphs = content.split(/\n\s*\n/).filter((p) => p.trim());

  return (
    <article className="space-y-4">
      {paragraphs.map((para, i) => {
        const trimmed = para.trim();

        // A paragraph that is entirely bold is a sub-heading.
        const isHeading =
          trimmed.startsWith('**') &&
          trimmed.endsWith('**') &&
          !trimmed.slice(2, -2).includes('**');

        if (isHeading) {
          return (
            <h2
              key={i}
              className="text-lg font-semibold text-white pt-4 first:pt-0"
            >
              {trimmed.slice(2, -2)}
            </h2>
          );
        }

        return (
          <p key={i} className="text-gray-300 leading-relaxed">
            {renderInline(trimmed, i)}
          </p>
        );
      })}
    </article>
  );
}
