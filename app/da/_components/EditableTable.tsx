export interface TextColumn<T> {
  key: keyof T & string;
  label: string;
}

export interface DataColumn<T> {
  key: keyof T & string;
  label: string;
  type: "number" | "checkbox";
  headerClass?: string;
  totalClass?: string;
}

interface EditableTableProps<T extends Record<string, string | boolean>> {
  caption: string;
  textColumns: TextColumn<T>[];
  groupHeader?: string;
  columns: DataColumn<T>[];
  rows: T[];
  totalLabel?: string;
  addLabel: string;
  defaultRow: T;
  onRowsChange: (rows: T[]) => void;
}

export default function EditableTable<
  T extends Record<string, string | boolean>,
>({
  caption,
  textColumns,
  groupHeader,
  columns,
  rows,
  totalLabel,
  addLabel,
  defaultRow,
  onRowsChange,
}: EditableTableProps<T>) {
  const updateRow = (
    index: number,
    key: keyof T & string,
    value: string | boolean,
  ) => {
    const newRows = [...rows];
    newRows[index] = { ...newRows[index], [key]: value };
    onRowsChange(newRows);
  };

  const removeRow = (index: number) => {
    onRowsChange(rows.filter((_, i) => i !== index));
  };

  const addRow = () => {
    onRowsChange([...rows, { ...defaultRow }]);
  };

  const hasGroupHeader = !!groupHeader;
  const showTotal = !!totalLabel;

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
                      <th
                        scope="col"
                        className="fr-col--xs"
                        rowSpan={2}
                        style={{ textAlign: "right" }}
                      ></th>
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
                    {textColumns.map((tc, i) => (
                      <th
                        key={tc.key}
                        scope="col"
                        // className={i ? "fr-col--md" : "fr-col--lg"}
                      >
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
                    <th
                      scope="col"
                      className="fr-col--xs"
                      style={{ textAlign: "center" }}
                    ></th>
                  </tr>
                )}
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={index}>
                    {textColumns.map((tc) => (
                      <td key={tc.key} className="fr-bg-info">
                        <input
                          className="fr-table-input"
                          type="text"
                          value={row[tc.key] as string}
                          onChange={(e) =>
                            updateRow(index, tc.key, e.target.value)
                          }
                        />
                      </td>
                    ))}
                    {columns.map((col) =>
                      col.type === "checkbox" ? (
                        <td key={col.key} style={{ textAlign: "center" }}>
                          <input
                            type="checkbox"
                            checked={row[col.key] as boolean}
                            onChange={(e) =>
                              updateRow(index, col.key, e.target.checked)
                            }
                          />
                        </td>
                      ) : (
                        <td key={col.key}>
                          <input
                            className="fr-table-input fr-table-input--right"
                            type="number"
                            value={row[col.key] as string}
                            onChange={(e) =>
                              updateRow(index, col.key, e.target.value)
                            }
                          />
                        </td>
                      ),
                    )}
                    <td style={{ textAlign: "center" }}>
                      <button
                        className="fr-btn fr-btn--tertiary-no-outline"
                        type="button"
                        title="Supprimer"
                        onClick={() => removeRow(index)}
                      >
                        <span
                          className="fr-icon-close-line"
                          aria-hidden="true"
                        ></span>
                      </button>
                    </td>
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
                    {textColumns.length > 1 ? null : null}
                    {columns.map((col) => {
                      const total =
                        col.type === "checkbox"
                          ? rows.filter((row) => row[col.key] as boolean).length
                          : rows.reduce(
                              (sum, row) =>
                                sum + (parseInt(row[col.key] as string) || 0),
                              0,
                            );
                      return (
                        <td
                          key={col.key}
                          className={col.totalClass ?? ""}
                          style={
                            col.type === "checkbox"
                              ? { textAlign: "center", fontWeight: "bold" }
                              : undefined
                          }
                        >
                          {col.type === "checkbox" ? (
                            total
                          ) : (
                            <input
                              className="fr-table-input fr-table-input--right fr-text--md"
                              type="number"
                              value={total}
                              readOnly
                            />
                          )}
                        </td>
                      );
                    })}
                    <td></td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="fr-table__footer">
        <div className="fr-table__footer--end">
          <ul className="fr-btns-group fr-btns-group--right fr-btns-group--inline-reverse fr-btns-group--inline-md">
            <li>
              <button
                className="fr-btn fr-btn--secondary"
                type="button"
                onClick={addRow}
              >
                <span className="fr-icon-add-line" aria-hidden="true"></span>
                {addLabel}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
