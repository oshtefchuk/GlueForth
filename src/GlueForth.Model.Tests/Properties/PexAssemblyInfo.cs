// <copyright file="PexAssemblyInfo.cs" company="-">Copyright © - 2007</copyright>
using Microsoft.Pex.Framework.Coverage;
using Microsoft.Pex.Framework.Creatable;
using Microsoft.Pex.Framework.Instrumentation;
using Microsoft.Pex.Framework.Settings;
using Microsoft.Pex.Framework.Validation;

// Microsoft.Pex.Framework.Settings
[assembly: PexAssemblySettings(TestFramework = "NUnit3")]

// Microsoft.Pex.Framework.Instrumentation
[assembly: PexAssemblyUnderTest("BlueNorth.Module.Web")]
[assembly: PexInstrumentAssembly("DevExpress.ExpressApp.Notifications.Web.v17.2")]
[assembly: PexInstrumentAssembly("DevExpress.ExpressApp.Maps.Web.v17.2")]
[assembly: PexInstrumentAssembly("DevExpress.ExpressApp.ReportsV2.Web.v17.2")]
[assembly: PexInstrumentAssembly("DevExpress.ExpressApp.Validation.Web.v17.2")]
[assembly: PexInstrumentAssembly("DevExpress.ExpressApp.Scheduler.Web.v17.2")]
[assembly: PexInstrumentAssembly("DevExpress.ExpressApp.FileAttachment.Web.v17.2")]
[assembly: PexInstrumentAssembly("DevExpress.Persistent.BaseImpl.v17.2")]
[assembly: PexInstrumentAssembly("DevExpress.ExpressApp.v17.2")]
[assembly: PexInstrumentAssembly("BlueNorth.Module")]
[assembly: PexInstrumentAssembly("DevExpress.ExpressApp.Chart.Web.v17.2")]
[assembly: PexInstrumentAssembly("DevExpress.ExpressApp.Web.v17.2")]

// Microsoft.Pex.Framework.Creatable
[assembly: PexCreatableFactoryForDelegates]

// Microsoft.Pex.Framework.Validation
[assembly: PexAllowedContractRequiresFailureAtTypeUnderTestSurface]
[assembly: PexAllowedXmlDocumentedException]

// Microsoft.Pex.Framework.Coverage
[assembly: PexCoverageFilterAssembly(PexCoverageDomain.UserOrTestCode, "DevExpress.ExpressApp.Notifications.Web.v17.2")]
[assembly: PexCoverageFilterAssembly(PexCoverageDomain.UserOrTestCode, "DevExpress.ExpressApp.Maps.Web.v17.2")]
[assembly: PexCoverageFilterAssembly(PexCoverageDomain.UserOrTestCode, "DevExpress.ExpressApp.ReportsV2.Web.v17.2")]
[assembly: PexCoverageFilterAssembly(PexCoverageDomain.UserOrTestCode, "DevExpress.ExpressApp.Validation.Web.v17.2")]
[assembly: PexCoverageFilterAssembly(PexCoverageDomain.UserOrTestCode, "DevExpress.ExpressApp.Scheduler.Web.v17.2")]
[assembly: PexCoverageFilterAssembly(PexCoverageDomain.UserOrTestCode, "DevExpress.ExpressApp.FileAttachment.Web.v17.2")]
[assembly: PexCoverageFilterAssembly(PexCoverageDomain.UserOrTestCode, "DevExpress.Persistent.BaseImpl.v17.2")]
[assembly: PexCoverageFilterAssembly(PexCoverageDomain.UserOrTestCode, "DevExpress.ExpressApp.v17.2")]
[assembly: PexCoverageFilterAssembly(PexCoverageDomain.UserOrTestCode, "BlueNorth.Module")]
[assembly: PexCoverageFilterAssembly(PexCoverageDomain.UserOrTestCode, "DevExpress.ExpressApp.Chart.Web.v17.2")]
[assembly: PexCoverageFilterAssembly(PexCoverageDomain.UserOrTestCode, "DevExpress.ExpressApp.Web.v17.2")]

