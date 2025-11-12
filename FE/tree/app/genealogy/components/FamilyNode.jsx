export default function FamilyNode({ node }) {
  return (
    <div
      style={{
        width: 120,
        height: 100,
        border: "2px solid #c0392b",
        borderRadius: 12,
        background: "#fff",
        textAlign: "center",
        padding: 8,
        boxShadow: "2px 2px 5px rgba(0,0,0,0.15)",
      }}
    >
      <img
        src={node.avatar || "/images/default.png"}
        alt={node.name}
        style={{ width: 50, height: 50, borderRadius: "50%" }}
      />
      <div style={{ marginTop: 6, fontWeight: "bold" }}>{node.name}</div>
    </div>
  );
}
