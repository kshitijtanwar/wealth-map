import { Page, Text, View, Document, StyleSheet } from "@react-pdf/renderer"
import type { Property, Owner } from "@/types"

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    backgroundColor: "#ffffff",
  },
  header: {
    marginBottom: 30,
    borderBottomWidth: 2,
    borderBottomColor: "#e2e8f0",
    paddingBottom: 15,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    width: 80,
    height: 80,
    backgroundColor: "#f1f5f9",
    borderRadius: 4,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#0f172a",
  },
  subtitle: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 5,
  },
  dateText: {
    fontSize: 12,
    color: "#94a3b8",
    marginTop: 5,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#1e40af",
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  card: {
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    backgroundColor: "#f8fafc",
  },
  highlightCard: {
    borderWidth: 1,
    borderColor: "#bfdbfe",
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    backgroundColor: "#eff6ff",
  },
  grid: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 15,
    marginBottom: 20,
  },
  gridItem: {
    width: "30%",
  },
  twoColumn: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
  },
  column: {
    flex: 1,
  },
  label: {
    fontSize: 11,
    color: "#64748b",
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0f172a",
    marginBottom: 6,
  },
  subValue: {
    fontSize: 12,
    color: "#64748b",
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    marginVertical: 10,
  },
  footer: {
    marginTop: 30,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
    fontSize: 10,
    color: "#94a3b8",
    textAlign: "center",
  },
  badge: {
    backgroundColor: "#dbeafe",
    borderRadius: 12,
    paddingVertical: 3,
    paddingHorizontal: 8,
    alignSelf: "flex-start",
    marginTop: 5,
  },
  badgeText: {
    fontSize: 10,
    color: "#1e40af",
    fontWeight: "bold",
  },
  progressBar: {
    height: 8,
    backgroundColor: "#e2e8f0",
    borderRadius: 4,
    marginTop: 8,
    marginBottom: 12,
  },
  progressFill: {
    height: 8,
    backgroundColor: "#3b82f6",
    borderRadius: 4,
  },
  dataSourceItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#3b82f6",
    marginRight: 8,
  },
})

interface PropertyReportPDFProps {
  property: Property
  owner?: Owner
  generatedDate?: Date
}

export const PropertyReportPDF = ({ property, owner, generatedDate = new Date() }: PropertyReportPDFProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.title}>{property.address}</Text>
          <Text style={styles.subtitle}>
            {property.city}, {property.state} {property.zipCode}
          </Text>
          <Text style={styles.dateText}>
            Report generated on{" "}
            {generatedDate.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Text>
        </View>
        <View style={styles.headerRight}>{/* Placeholder for property image or logo */}</View>
      </View>

      {/* Overview Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Property Overview</Text>
        <View style={styles.grid}>
          {/* Property Value */}
          <View style={[styles.highlightCard, styles.gridItem]}>
            <Text style={styles.label}>Property Value</Text>
            <Text style={styles.value}>${property.value?.toLocaleString()}</Text>
            <View style={styles.divider} />
            <Text style={styles.subValue}>Last Assessed: Oct 2023</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Premium</Text>
            </View>
          </View>

          {/* Property Size */}
          <View style={[styles.card, styles.gridItem]}>
            <Text style={styles.label}>Property Size</Text>
            <Text style={styles.value}>{property.size} sq ft</Text>
            <View style={styles.divider} />
            <Text style={styles.subValue}>5 bed, 4 bath</Text>
          </View>

          {/* Owner Net Worth */}
          {owner && (
            <View style={[styles.card, styles.gridItem]}>
              <Text style={styles.label}>Owner Net Worth</Text>
              <Text style={styles.value}>${owner.estimatedNetWorth?.toLocaleString()}</Text>
              <View style={styles.divider} />
              <Text style={styles.subValue}>Confidence: {owner.confidenceLevel || "unknown"}</Text>
            </View>
          )}
        </View>
      </View>

      {/* Property Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Property Details</Text>
        <View style={styles.twoColumn}>
          <View style={styles.column}>
            <View style={styles.card}>
              <Text style={styles.label}>Year Built</Text>
              {/* <Text style={styles.value}>{property.yearBuilt || "N/A"}</Text> */}
              <View style={styles.divider} />
              <Text style={styles.label}>Property Type</Text>
              {/* <Text style={styles.value}>{property.type || "Residential"}</Text> */}
              <View style={styles.divider} />
              <Text style={styles.label}>Lot Size</Text>
              {/* <Text style={styles.value}>{property.size || "N/A"}</Text> */}
            </View>
          </View>
          {owner && (
            <View style={styles.column}>
              <View style={styles.highlightCard}>
                <Text style={styles.label}>Owner</Text>
                <Text style={styles.value}>{owner.name}</Text>
                <View style={styles.divider} />
                <Text style={styles.label}>Contact</Text>
                {/* <Text style={styles.value}>{owner.contact || "Not available"}</Text> */}
                <View style={styles.divider} />
                <Text style={styles.label}>Ownership Duration</Text>
                {/* <Text style={styles.value}>{owner.ownershipDuration || "N/A"}</Text> */}
              </View>
            </View>
          )}
        </View>
      </View>

      {/* Owner Analysis */}
      {owner && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Owner Analysis</Text>
          <View style={styles.twoColumn}>
            <View style={styles.column}>
              <View style={styles.card}>
                <Text style={styles.label}>Wealth Composition</Text>
                <View style={styles.divider} />

                <Text style={styles.label}>Real Estate</Text>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: "60%" }]} />
                </View>
                <Text style={styles.value}>60%</Text>

                <Text style={styles.label}>Investments</Text>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: "30%" }]} />
                </View>
                <Text style={styles.value}>30%</Text>

                <Text style={styles.label}>Other</Text>
                <View style={styles.progressBar}>
                  <View style={[styles.progressFill, { width: "10%" }]} />
                </View>
                <Text style={styles.value}>10%</Text>
              </View>
            </View>
            <View style={styles.column}>
              <View style={styles.card}>
                <Text style={styles.label}>Data Sources</Text>
                <View style={styles.divider} />

                <View style={styles.dataSourceItem}>
                  <View style={styles.dot} />
                  <Text style={styles.subValue}>Public Records</Text>
                </View>

                <View style={styles.dataSourceItem}>
                  <View style={styles.dot} />
                  <Text style={styles.subValue}>Tax Assessments</Text>
                </View>

                <View style={styles.dataSourceItem}>
                  <View style={styles.dot} />
                  <Text style={styles.subValue}>Market Analysis</Text>
                </View>

                <View style={styles.dataSourceItem}>
                  <View style={styles.dot} />
                  <Text style={styles.subValue}>Property History</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      )}

      {/* Footer */}
      <View style={styles.footer}>
        <Text>This report is confidential and intended for authorized personnel only.</Text>
        <Text>© {new Date().getFullYear()} Property Analytics. All rights reserved.</Text>
      </View>
    </Page>
  </Document>
)
