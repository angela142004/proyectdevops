import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { API_KEY, API_BASE_URL } from "../config/env.jsx";
import ReactMarkdown from "react-markdown";
import pict from "../assets/eventos.png";

const MarkdownRenderer = ({ content }) => {
  const parseMarkdown = (text) => {
    if (!text) return "";
    let html = text;
    html = html.replace(/^### (.*$)/gm, "<h3>$1</h3>");
    html = html.replace(/^## (.*$)/gm, "<h2>$1</h2>");
    html = html.replace(/^# (.*$)/gm, "<h1>$1</h1>");
    html = html.replace(/\*\*\*(.*?)\*\*\*/g, "<strong><em>$1</em></strong>");
    html = html.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    html = html.replace(/\*(.*?)\*/g, "<em>$1</em>");
    html = html.replace(
      /```(\w+)?\n([\s\S]*?)```/g,
      '<pre><code data-lang="$1">$2</code></pre>'
    );
    html = html.replace(/`([^`]+)`/g, "<code>$1</code>");
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
    html = html.replace(
      /!\[([^\]]*)\]\(([^)]+)\)/g,
      '<img src="$2" alt="$1" />'
    );
    html = html.replace(/^> (.*$)/gm, "<blockquote>$1</blockquote>");
    html = html.replace(/^---$/gm, "<hr />");

    const lines = html.split("\n");
    const processedLines = [];
    let inUnorderedList = false;
    let inOrderedList = false;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const isUnorderedListItem = /^[\*-] (.*)/.test(line);
      const isOrderedListItem = /^\d+\. (.*)/.test(line);

      if (isUnorderedListItem) {
        if (!inUnorderedList) {
          processedLines.push("<ul>");
          inUnorderedList = true;
        }
        if (inOrderedList) {
          processedLines.push("</ol>");
          inOrderedList = false;
        }
        const content = line.replace(/^[\*-] (.*)/, "$1");
        processedLines.push(`<li>${content}</li>`);
      } else if (isOrderedListItem) {
        if (!inOrderedList) {
          processedLines.push("<ol>");
          inOrderedList = true;
        }
        if (inUnorderedList) {
          processedLines.push("</ul>");
          inUnorderedList = false;
        }
        const content = line.replace(/^\d+\. (.*)/, "$1");
        processedLines.push(`<li>${content}</li>`);
      } else {
        if (inUnorderedList) {
          processedLines.push("</ul>");
          inUnorderedList = false;
        }
        if (inOrderedList) {
          processedLines.push("</ol>");
          inOrderedList = false;
        }
        processedLines.push(line);
      }
    }

    if (inUnorderedList) processedLines.push("</ul>");
    if (inOrderedList) processedLines.push("</ol>");
    html = processedLines.join("\n");
    html = html.replace(/\n\n/g, "</p><p>");
    html = "<p>" + html + "</p>";
    html = html.replace(/<p><\/p>/g, "");
    html = html.replace(/<p>(<h[1-6]>)/g, "$1");
    html = html.replace(/(<\/h[1-6]>)<\/p>/g, "$1");
    html = html.replace(/<p>(<ul>)/g, "$1");
    html = html.replace(/(<\/ul>)<\/p>/g, "$1");
    html = html.replace(/<p>(<ol>)/g, "$1");
    html = html.replace(/(<\/ol>)<\/p>/g, "$1");
    html = html.replace(/<p>(<li>)/g, "$1");
    html = html.replace(/(<\/li>)<\/p>/g, "$1");
    html = html.replace(/<p>(<blockquote>)/g, "$1");
    html = html.replace(/(<\/blockquote>)<\/p>/g, "$1");
    html = html.replace(/<p>(<pre>)/g, "$1");
    html = html.replace(/(<\/pre>)<\/p>/g, "$1");
    html = html.replace(/<p>(<hr \/>)/g, "$1");
    return html;
  };

  const createMarkup = (content) => {
    return { __html: parseMarkdown(content) };
  };

  const customStyles = `
    @media (max-width: 768px) {
      .markdown-content h1 { font-size: 1.75rem; }
      .markdown-content h2 { font-size: 1.5rem; }
      .markdown-content h3 { font-size: 1.25rem; }
      .markdown-content p,
      .markdown-content li {
        font-size: 1rem;
        line-height: 1.6;
      }
      .markdown-content pre {
        font-size: 0.875rem;
        padding: 1rem;
      }
    }
    @media (max-width: 480px) {
      .markdown-content h1 { font-size: 1.5rem; }
      .markdown-content h2 { font-size: 1.25rem; }
      .markdown-content h3 { font-size: 1.125rem; }
      .markdown-content p,
      .markdown-content li {
        font-size: 0.95rem;
      }
    }
  `;

  return (
    <div className="prose prose-lg max-w-none mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <style dangerouslySetInnerHTML={{ __html: customStyles }} />
      <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
      <div className="p-4 sm:p-6 md:p-8 markdown-content">
        <div dangerouslySetInnerHTML={createMarkup(content)} />
      </div>
    </div>
  );
};

export default function BlogDetalle() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/prisma/post/public/${id}`,
          {
            headers: {
              "x-api-key": API_KEY,
            },
          }
        );

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || "Error al obtener la publicación");
        }

        const data = await response.json();
        setPost(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPost();
    } else {
      setError("ID no válido");
      setLoading(false);
    }
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] py-10 px-4 sm:px-6 md:px-8 lg:px-24 text-[#003049]">
      {loading ? (
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#003049] mx-auto"></div>
          <p className="mt-4">Cargando publicación...</p>
        </div>
      ) : error ? (
        <div className="text-center text-red-600">{error}</div>
      ) : (
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg p-6 sm:p-8 md:p-10">
          <div className="mb-6 sm:mb-8">
            <img
              src={post.images?.length > 0 ? post.images[0].image_url : pict}
              alt={post.title}
              className="w-full h-56 sm:h-64 md:h-72 object-cover rounded-xl shadow-sm"
              loading="lazy"
            />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-[#1a202c] mb-4 leading-tight">
            {post.title}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 text-center mb-6">
            📅 {formatDate(post.created_at)}
            {post.location && ` | 📍 ${post.location}`}
          </p>
          <MarkdownRenderer content={post.content} />
          {post.images?.length > 1 && (
            <>
              <img
                src={post.images[1].image_url}
                alt={post.title}
                className="w-full h-56 sm:h-64 md:h-72 object-cover rounded-xl shadow-sm mt-6"
                loading="lazy"
              />
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {post.images.map((image, index) => (
                  <img
                    key={index}
                    src={image.image_url}
                    alt={`${post.title} - imagen ${index + 1}`}
                    className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-md shadow"
                    loading="lazy"
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
