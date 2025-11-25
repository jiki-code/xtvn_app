"use client";

export const RecentBreaksBox = ({ breaks = [] }) => {
  const items = breaks;

  // Split items into left and right columns
  const leftItems = items.filter((_, i) => i % 2 === 0);
  const rightItems = items.filter((_, i) => i % 2 !== 0);

  return (
    <div
      style={{
        borderRadius: "10px",
        border: "1px solid #eee",
        padding: "16px",
      }}
    >
      <h3 style={{ fontWeight: "bold", color: "#000" }}>RECENT BREAKS</h3>
      <h4 style={{ color: "#7D8BAA", marginBottom: "16px" }}>
        Real time update of employees recent breaks
      </h4>

      <div style={{ display: "flex", gap: "16px" }}>
        {/* Left Column */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
          {leftItems.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                borderBottom: "1px solid #eee",
                padding: "8px 0",
              }}
            >
              <p style={{ margin: 0, fontWeight: "bold", color: "#000" }}>{item.name}</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: "0.9rem", color: "#555" }}>
                  <span>{item.id}</span>{" "}
                  <span style={{ marginLeft: 6, fontWeight: "bold", color: "#3FC348" }}>
                    {item.type}
                  </span>
                </div>
                <div style={{ fontSize: "0.85rem", color: "#999" }}>
                  {item.timeAgo || "1 minute ago"}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Middle vertical border */}
        <div style={{ width: "1px", background: "#eee" }}></div>

        {/* Right Column */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
          {rightItems.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                flexDirection: "column",
                borderBottom: "1px solid #eee",
                padding: "8px 0",
              }}
            >
              <p style={{ margin: 0, fontWeight: "bold", color: "#000" }}>{item.name}</p>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: "0.9rem", color: "#555" }}>
                  <span>{item.id}</span>{" "}
                  <span style={{ marginLeft: 6, fontWeight: "bold", color: "#3FC348" }}>
                    {item.type}
                  </span>
                </div>
                <div style={{ fontSize: "0.85rem", color: "#999" }}>
                  {item.timeAgo || "1 minute ago"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
