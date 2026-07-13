import { useState } from "react";
import "../assets/css/referencepage.css";
import { Search, ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import { Iversion } from "../assets/js/mytypes";
import { isLegacyVersion } from "../assets/js/helper";

import { VERSION_MAP } from "./versions-data/index";
import { ScrollToSection } from "../ui/ScrollAssist";
import { Link } from "react-router";

function matchesSearch(query: string, ...fields: (string | undefined)[]): boolean {
  if (!query) return true;
  const q = query.toLowerCase();
  return fields.some(f => typeof f === "string" && f.toLowerCase().includes(q));
}

function itemMatchesSearch(query: string, item: any, key?: string): boolean {
  if (!query) return true;
  const desc = typeof item.description === "string" ? item.description : "";
  if (matchesSearch(query, key, item.signature, desc)) return true;
  if (item.args?.length) {
    return item.args.some((a: any) => matchesSearch(query, a.name, a.desc));
  }
  return false;
}

export default function ReferencePage({ version }: { version: Iversion }) {
  const data = VERSION_MAP[version];
  const NOTIFICATION_METHODS = data?.NOTIFICATION_METHODS || {};
  const [searchQuery, setSearchQuery] = useState("");
  const [openCards, setOpenCards] = useState<Record<string, boolean>>({});

  const toggle = (key: string) => setOpenCards(p => ({ ...p, [key]: !p[key] }));

  const notificationEntries = Object.entries(NOTIFICATION_METHODS).filter(
    ([key, m]) => itemMatchesSearch(searchQuery, m, key)
  );
  const handlerMethods = (data?.HANDLER_METHODS || []).filter((m: any) =>
    itemMatchesSearch(searchQuery, m, m.id)
  );
  const styleEntries = data?.STYLE_ATTRIBUTES
    ? Object.entries(data.STYLE_ATTRIBUTES).filter(([key, m]) =>
        itemMatchesSearch(searchQuery, m, key)
      )
    : [];

  const totalMethods =
    Object.keys(NOTIFICATION_METHODS).length +
    (data?.HANDLER_METHODS?.length || 0) +
    (data?.STYLE_ATTRIBUTES ? Object.keys(data.STYLE_ATTRIBUTES).length : 0);
  const matchedCount = notificationEntries.length + handlerMethods.length + styleEntries.length;
  const hasResults = matchedCount > 0;

  return (
    <div className="page main-page reference-page">
      <ScrollToSection />
      <h2>Reference</h2>
      <hr />

      <p className="intro-text">All methods, arguments, and descriptions for v{version}.</p>

      <div className="ref-search-wrapper">
        <Search className="ref-search-icon" size={18} />
        <input
          type="search"
          className="ref-search-input"
          placeholder="Search methods, signatures, descriptions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button className="ref-search-clear" onClick={() => setSearchQuery("")}>
            &times;
          </button>
        )}
      </div>

      {searchQuery && (
        <p className="ref-search-count">
          {hasResults
            ? <>Found <strong>{matchedCount}</strong> of {totalMethods} results</>
            : <>No results for "<strong>{searchQuery}</strong>"</>}
        </p>
      )}

      {!hasResults && searchQuery && (
        <div className="ref-no-results">
          <p>Try a different search term</p>
        </div>
      )}

      {hasResults && (
        <>
          {version === "1.59" && (
            <div className="ref-note">
              <strong>v1.59 note:</strong> Methods were introduced to free up <code>__init__</code> kwargs and replace direct style usage.
            </div>
          )}

          {notificationEntries.length > 0 && (
            <section id="notification-class" className="ref-section" tabIndex={0}>
              <h3 className="ref-section-title">Notification</h3>
              <div className="api-grid">
                {notificationEntries.map(([key, m]: [string, any]) => {
                  const cls = "api-card" + (openCards[key] ? " open" : "");
                  return (
                    <div key={key} className={cls}>
                      <div className="api-head" onClick={() => toggle(key)}>
                        <span className="api-sig">{m.signature || key}</span>
                        <ChevronDown size={14} className="api-chevron" />
                      </div>
                      <div className="api-body">
                        <div className="api-inner">
                          <p className="api-desc">{m.description}</p>
                          {m.args && m.args.length > 0 && (
                            <dl className="api-args">
                              {m.args.map((a: any) => (
                                <div key={a.name}><dt>{a.name}</dt><dd>{a.desc}</dd></div>
                              ))}
                            </dl>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {handlerMethods.length > 0 && (
            <section id="notificationhandler-class" className="ref-section" tabIndex={0}>
              <h3 className="ref-section-title">NotificationHandler</h3>
              <div className="api-grid">
                {handlerMethods.map((m: any) => {
                  const cls = "api-card" + (openCards[m.id] ? " open" : "");
                  return (
                    <div key={m.id} className={cls}>
                      <div className="api-head" onClick={() => toggle(m.id)}>
                        <span className="api-sig">{m.signature}</span>
                        <ChevronDown size={14} className="api-chevron" />
                      </div>
                      <div className="api-body">
                        <div className="api-inner">
                          <p className="api-desc">{m.description}</p>
                          {m.args && m.args.length > 0 && (
                            <dl className="api-args">
                              {m.args.map((a: any) => (
                                <div key={a.name}><dt>{a.name}</dt><dd>{a.desc}</dd></div>
                              ))}
                            </dl>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {styleEntries.length > 0 && (
            <section id="notificationstyles-class" className="ref-section" tabIndex={0}>
              <h3 className="ref-section-title">
                {isLegacyVersion(version)
                  ? "NotificationStyles Attributes"
                  : "NotificationStyles (deprecated)"}
              </h3>
              {!isLegacyVersion(version) && (
                <p className="ref-note warn" style={{ marginTop: 0 }}>
                  All NotificationStyles attributes are deprecated in v1.59.3. Use methods like <code>setSmallIcon</code>, <code>setLargeIcon</code>, <code>setBigPicture</code>, <code>setBigText</code>, and <code>updateProgressBar</code> instead.
                </p>
              )}
              <div className="api-grid">
                {styleEntries.map(([key, m]: [string, any]) => {
                  const cls = "api-card" + (openCards[key] ? " open" : "");
                  return (
                    <div key={key} className={cls}>
                      <div className="api-head" onClick={() => toggle(key)}>
                        <span className="api-sig">{m.signature || key}</span>
                        <ChevronDown size={14} className="api-chevron" />
                      </div>
                      <div className="api-body">
                        <div className="api-inner">
                          <p className="api-desc">{m.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}
        </>
      )}

      <span className='flex next-page-btns-box space-between'>
        <Link className='next-page-btn' to='/advanced-methods'>
          <ChevronLeft />
          <span>
            <p className='next-txt'>Previous</p>
            <p className='page-name'>Advanced Methods</p>
          </span>
        </Link>
        <Link className='next-page-btn' to='/help'>
          <span>
            <p className='next-txt'>Next</p>
            <p className='page-name'>Help</p>
          </span>
          <ChevronRight />
        </Link>
      </span>
    </div>
  );
}
