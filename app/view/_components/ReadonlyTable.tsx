export interface ReadonlyTextColumn {
  key: string;
  label: string;
}

export interface ReadonlyDataColumn {
  key: string;
  label: string;
  type: "number" | "checkbox";
  headerClass?: string;
  totalClass?: string;
}

interface ReadonlyTableProps {
  caption: string;
  textColumns: ReadonlyTextColumn[];
  groupHeader?: string;
  columns: ReadonlyDataColumn[];
  rows: Record<string, string | boolean>[];
  totalLabel?: string;
}

export default function ReadonlyTable({
  caption,
  textColumns,
  groupHeader,
  columns,
  rows,
  totalLabel,
}: ReadonlyTableProps) {
  const hasGroupHeader = !!groupHeader;
  const showTotal = !!totalLabel;

  const filteredRows = rows.filter((row) =>
    textColumns.some((tc) => {
      const val = row[tc.key];
      return typeof val === "string" && val.trim() !== "";
    })
  );

  if (filteredRows.length === 0) return null;

  return (
    <div className="fr-table fr-table--no-caption fr-table--bordered fr-table--sm">
      <div className="fr-table__wrapper">
        <div className="fr-table__container">
          <div className="fr-table__content">
            <table>
              <caption>{caption}</caption>
              <thead>
                {hasGroupHeader ? (
                  <>
                    <tr>
                      {textColumns.map((tc) => (
                        <th key={tc.key} scope="col" rowSpan={2}>
                          {tc.label}
                        </th>
                      ))}
                      <th
                        scope="col"
                        className="fr-col--xs"
                        colSpan={columns.length}
                        style={{ textAlign: "center" }}
                      >
                        {groupHeader}
                      </th>
                    </tr>
                    <tr>
                      {columns.map((col) => (
                        <th
                          key={col.key}
                          scope="col"
                          className={`fr-col--sm ${col.headerClass ?? ""}`}
                          style={{ textAlign: "center" }}
                        >
                          {col.label}
                        </th>
                      ))}
                    </tr>
                  </>
                ) : (
                  <tr>
                    {textColumns.map((tc) => (
                      <th key={tc.key} scope="col">
                        {tc.label}
                      </th>
                    ))}
                    {columns.map((col) => (
                      <th
                        key={col.key}
                        scope="col"
                        className={`fr-col--xs ${col.headerClass ?? ""}`}
                        style={{ textAlign: "center" }}
                      >
                        {col.label}
                      </th>
                    ))}
                  </tr>
                )}
              </thead>
              <tbody>
                {filteredRows.map((row, index) => (
                  <tr key={index}>
                    {textColumns.map((tc) => (
                      <td key={tc.key}>{row[tc.key] as string}</td>
                    ))}
                    {columns.map((col) =>
                      col.type === "checkbox" ? (
                        <td key={col.key} style={{ textAlign: "center" }}>
                          {row[col.key] ? (
                            <span
                              className="fr-icon-check-line"
                              aria-hidden="true"
                            ></span>
                          ) : (
                            "—"
                          )}
                        </td>
                      ) : (
                        <td
                          key={col.key}
                          style={{ textAlign: "right" }}
                        >
                          {row[col.key] as string}
                        </td>
                      ),
                    )}
                  </tr>
                ))}
                {showTotal && (
                  <tr>
                    <td
                      colSpan={
                        textColumns.length > 1 ? textColumns.length : undefined
                      }
                    >
                      <strong>{totalLabel}</strong>
                    </td>
                    {columns.map((col) => {
                      const total =
                        col.type === "checkbox"
                          ? filteredRows.filter(
                              (row) => row[col.key] as boolean,
                            ).length
                          : filteredRows.reduce(
                              (sum, row) =>
                                sum +
                                (parseInt(row[col.key] as string) || 0),
                              0,
                            );
                      return (
                        <td
                          key={col.key}
                          className={col.totalClass ?? ""}
                          style={
                            col.type === "checkbox"
                              ? { textAlign: "center", fontWeight: "bold" }
                              : { textAlign: "right", fontWeight: "bold" }
                          }
                        >
                          {total}
                        </td>
                      );
                    })}
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
