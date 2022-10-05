using Microsoft.Owin.Security.OAuth;
using System;
using System.Net.Http.Headers;
using System.Web.Http;
using System.Web.OData.Builder;
using System.Web.OData.Extensions;

namespace GlueForth.WebApi
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services
            // Configure Web API to use only bearer token authentication.
            config.SuppressDefaultHostAuthentication();
            config.Filters.Add(new HostAuthenticationFilter(OAuthDefaults.AuthenticationType));

            // Web API routes
            config.MapHttpAttributeRoutes();

            config.SetTimeZoneInfo(TimeZoneInfo.Utc);

            ODataConventionModelBuilder builder = new ODataConventionModelBuilder();

            builder.EntitySet<Address>("Addresses");
            builder.EntityType<Address>().HasKey(entity => entity.Oid);
            builder.EntityType<Address>().HasOptional<Country>(entity => entity.Country1, (entity, tergetEntity) => entity.Country == tergetEntity.Oid);

            builder.EntitySet<Answer>("Answers");
            builder.EntityType<Answer>().HasKey(entity => entity.OID);

            builder.EntitySet<Characteristic>("Characteristics");
            builder.EntityType<Characteristic>().HasKey(entity => entity.OID);
            builder.EntityType<Characteristic>().HasOptional<Principle>(entity => entity.Principle1, (entity, tergetEntity) => entity.Principle == tergetEntity.OID);
            builder.EntityType<Characteristic>().HasOptional<PrincipleGroup>(entity => entity.PrincipleGroup1, (entity, tergetEntity) => entity.PrincipleGroup == tergetEntity.OID);
            builder.EntityType<Characteristic>().HasOptional<Version>(entity => entity.Version1, (entity, tergetEntity) => entity.Version == tergetEntity.OID);

            builder.EntitySet<CharacteristicGuidanceNote>("CharacteristicGuidanceNotes");
            builder.EntityType<CharacteristicGuidanceNote>().HasKey(entity => entity.OID);
            builder.EntityType<CharacteristicGuidanceNote>().HasOptional<Characteristic>(entity => entity.Characteristic1, (entity, tergetEntity) => entity.Characteristic == tergetEntity.OID);
            builder.EntityType<CharacteristicGuidanceNote>().HasOptional<Version>(entity => entity.Version1, (entity, tergetEntity) => entity.Version == tergetEntity.OID);

            builder.EntitySet<Commodity>("Commodities");
            builder.EntityType<Commodity>().HasKey(entity => entity.OID);
            builder.EntityType<Commodity>().HasOptional<CommodityCategory>(entity => entity.CommodityCategory, (entity, tergetEntity) => entity.Category == tergetEntity.OID);
            builder.EntityType<Commodity>().HasOptional<Version>(entity => entity.Version1, (entity, tergetEntity) => entity.Version == tergetEntity.OID);

            builder.EntitySet<CommodityCategory>("CommodityCategories");
            builder.EntityType<CommodityCategory>().HasKey(entity => entity.OID);
            builder.EntityType<CommodityCategory>().HasOptional<Version>(entity => entity.Version1, (entity, tergetEntity) => entity.Version == tergetEntity.OID);

            builder.EntitySet<CommodityIndicatorGuidance>("CommodityIndicatorGuidances");
            builder.EntityType<CommodityIndicatorGuidance>().HasKey(entity => entity.OID);
            builder.EntityType<CommodityIndicatorGuidance>().HasOptional<Commodity>(entity => entity.Commodity1, (entity, tergetEntity) => entity.Commodity == tergetEntity.OID);
            builder.EntityType<CommodityIndicatorGuidance>().HasOptional<Indicator>(entity => entity.Indicator1, (entity, tergetEntity) => entity.Indicator == tergetEntity.OID);
            builder.EntityType<CommodityIndicatorGuidance>().HasOptional<Version>(entity => entity.Version1, (entity, tergetEntity) => entity.Version == tergetEntity.OID);

            builder.EntitySet<Country>("Countries");
            builder.EntityType<Country>().HasKey(entity => entity.Oid);

            builder.EntitySet<Dimension>("Dimensions");
            builder.EntityType<Dimension>().HasKey(entity => entity.OID);
            builder.EntityType<Dimension>().HasOptional<Version>(entity => entity.Version1, (entity, tergetEntity) => entity.Version == tergetEntity.OID);

            builder.EntitySet<Grade>("Grades");
            builder.EntityType<Grade>().HasKey(entity => entity.OID);
            builder.EntityType<Grade>().HasOptional<Version>(entity => entity.Version1, (entity, tergetEntity) => entity.Version == tergetEntity.OID);

            builder.EntitySet<Indicator>("Indicators");
            builder.EntityType<Indicator>().HasKey(entity => entity.OID);
            builder.EntityType<Indicator>().HasOptional<Characteristic>(entity => entity.Characteristic1, (entity, tergetEntity) => entity.Characteristic == tergetEntity.OID);
            builder.EntityType<Indicator>().HasOptional<Version>(entity => entity.Version1, (entity, tergetEntity) => entity.Version == tergetEntity.OID);

            builder.EntitySet<PrimaryDataValue>("PrimaryDataValues");
            builder.EntityType<PrimaryDataValue>().HasKey(entity => entity.OID);

            builder.EntitySet<ConversionFactor>("ConversionFactors");
            builder.EntityType<ConversionFactor>().HasKey(entity => entity.OID);
            //builder.EntityType<PrimaryDataValue>().HasOptional<Version>(entity => entity.Version1, (entity, tergetEntity) => entity.Version == tergetEntity.OID);

            builder.EntitySet<IndicatorDataSet>("IndicatorDataSets");
            builder.EntityType<IndicatorDataSet>().HasKey(entity => entity.OID);

            builder.EntitySet<PrimaryDataFieldNote>("PrimaryDataFieldNotes");
            builder.EntityType<PrimaryDataFieldNote>().HasKey(entity => entity.OID);
            //builder.EntityType<IndicatorDataSet>().HasOptional<Version>(entity => entity.Version1, (entity, tergetEntity) => entity.Version == tergetEntity.OID);

            builder.EntitySet<Organization>("Organizations");
            builder.EntityType<Organization>().HasKey(entity => entity.Oid);
            builder.EntityType<Organization>().HasOptional<Party>(entity => entity.Party, (entity, tergetEntity) => entity.Oid == tergetEntity.Oid);

            builder.EntitySet<Organisation>("Organisations");
            builder.EntityType<Organisation>().HasKey(entity => entity.Oid);
            builder.EntityType<Organisation>().HasOptional<Organization>(entity => entity.Organization, (entity, tergetEntity) => entity.Oid == tergetEntity.Oid);

            builder.EntitySet<Party>("Parties");
            builder.EntityType<Party>().HasKey(entity => entity.Oid);
            builder.EntityType<Party>().HasOptional<Address>(entity => entity.Address, (entity, tergetEntity) => entity.Address1 == tergetEntity.Oid);
            builder.EntityType<Party>().HasOptional<Address>(entity => entity.Address3, (entity, tergetEntity) => entity.Address2 == tergetEntity.Oid);

            builder.EntitySet<PermissionPolicyRole>("PermissionPolicyRoles");
            builder.EntityType<PermissionPolicyRole>().HasKey(entity => entity.Oid);

            builder.EntitySet<PermissionPolicyUser>("PermissionPolicyUsers");
            builder.EntityType<PermissionPolicyUser>().HasKey(entity => entity.Oid);
            builder.EntityType<PermissionPolicyUser>().Filter("UserName");

            builder.EntitySet<PermissionPolicyUserUsers_PermissionPolicyRoleRoles>("PermissionPolicyUserUsers_PermissionPolicyRoleRoles");
            builder.EntityType<PermissionPolicyUserUsers_PermissionPolicyRoleRoles>().HasKey(entity => entity.OID);
            //builder.EntityType<PermissionPolicyUserUsers_PermissionPolicyRoleRoles>().HasOptional<PermissionPolicyRole>(entity => entity.PermissionPolicyRole, (entity, tergetEntity) => entity.PermissionPolicyRole.Oid == tergetEntity.Oid);
            //builder.EntityType<PermissionPolicyUserUsers_PermissionPolicyRoleRoles>().HasOptional<PermissionPolicyUser>(entity => entity.PermissionPolicyUser, (entity, tergetEntity) => entity.PermissionPolicyUser.Oid == tergetEntity.Oid);

            builder.EntitySet<Person>("People");
            builder.EntityType<Person>().HasKey(entity => entity.Oid);
            builder.EntityType<Person>().HasOptional<Party>(entity => entity.Party, (entity, tergetEntity) => entity.Oid == tergetEntity.Oid);

            builder.EntitySet<PhoneNumber>("PhoneNumbers");
            builder.EntityType<PhoneNumber>().HasKey(entity => entity.Oid);
            builder.EntityType<PhoneNumber>().HasOptional<Party>(entity => entity.Party1, (entity, tergetEntity) => entity.Party == tergetEntity.Oid);

            builder.EntitySet<PrimaryDataField>("PrimaryDataFields");
            builder.EntityType<PrimaryDataField>().HasKey(entity => entity.OID);
            builder.EntityType<PrimaryDataField>().HasOptional<PrimaryDataType>(entity => entity.PrimaryDataType1, (entity, tergetEntity) => entity.PrimaryDataType == tergetEntity.OID);
            builder.EntityType<PrimaryDataField>().HasOptional<Version>(entity => entity.Version1, (entity, tergetEntity) => entity.Version == tergetEntity.OID);

            builder.EntitySet<PrimaryDataType>("PrimaryDataTypes");
            builder.EntityType<PrimaryDataType>().HasKey(entity => entity.OID);
            builder.EntityType<PrimaryDataType>().HasOptional<Version>(entity => entity.Version1, (entity, tergetEntity) => entity.Version == tergetEntity.OID);

            builder.EntitySet<Principle>("Principles");
            builder.EntityType<Principle>().HasKey(entity => entity.OID);
            builder.EntityType<Principle>().HasOptional<Dimension>(entity => entity.Dimension1, (entity, tergetEntity) => entity.Dimension == tergetEntity.OID);
            builder.EntityType<Principle>().HasOptional<Version>(entity => entity.Version1, (entity, tergetEntity) => entity.Version == tergetEntity.OID);

            builder.EntitySet<PrincipleGroup>("PrincipleGroups");
            builder.EntityType<PrincipleGroup>().HasKey(entity => entity.OID);
            builder.EntityType<PrincipleGroup>().HasOptional<Version>(entity => entity.Version1, (entity, tergetEntity) => entity.Version == tergetEntity.OID);

            builder.EntitySet<Question>("Questions");
            builder.EntityType<Question>().HasKey(entity => entity.OID);
            builder.EntityType<Question>().HasOptional<Version>(entity => entity.Version1, (entity, tergetEntity) => entity.Version == tergetEntity.OID);

            builder.EntitySet<QuestionGroup>("QuestionGroups");
            builder.EntityType<QuestionGroup>().HasKey(entity => entity.OID);
            builder.EntityType<QuestionGroup>().HasOptional<QuestionGroup>(entity => entity.QuestionGroup2, (entity, tergetEntity) => entity.Parent == tergetEntity.OID);
            builder.EntityType<QuestionGroup>().HasOptional<Version>(entity => entity.Version1, (entity, tergetEntity) => entity.Version == tergetEntity.OID);


            builder.EntitySet<Retailer>("Retailers");
            builder.EntityType<Retailer>().HasKey(entity => entity.OID);
            builder.EntityType<Retailer>().HasOptional<Version>(entity => entity.Version1, (entity, tergetEntity) => entity.Version == tergetEntity.OID);

            builder.EntitySet<SPADataSet>("SPADataSets");
            builder.EntityType<SPADataSet>().HasKey(entity => entity.OID);

            builder.EntitySet<Standard>("Standards");
            builder.EntityType<Standard>().HasKey(entity => entity.OID);
            builder.EntityType<Standard>().HasOptional<Version>(entity => entity.Version1, (entity, tergetEntity) => entity.Version == tergetEntity.OID);

            builder.EntitySet<StandardChapter>("StandardChapters");
            builder.EntityType<StandardChapter>().HasKey(entity => entity.OID);
            builder.EntityType<StandardChapter>().HasOptional<Standard>(entity => entity.Standard1, (entity, tergetEntity) => entity.Standard == tergetEntity.OID);
            builder.EntityType<StandardChapter>().HasOptional<StandardChapter>(entity => entity.StandardChapter2, (entity, tergetEntity) => entity.Parent == tergetEntity.OID);
            builder.EntityType<StandardChapter>().HasOptional<Version>(entity => entity.Version1, (entity, tergetEntity) => entity.Version == tergetEntity.OID);

            builder.EntitySet<StandardContent>("StandardContents");
            builder.EntityType<StandardContent>().HasKey(entity => entity.OID);
            builder.EntityType<StandardContent>().HasOptional<StandardChapter>(entity => entity.StandardChapter1, (entity, tergetEntity) => entity.StandardChapter == tergetEntity.OID);
            builder.EntityType<StandardContent>().HasOptional<Version>(entity => entity.Version1, (entity, tergetEntity) => entity.Version == tergetEntity.OID);

            builder.EntitySet<StandardStandards_CommodityCommodities>("StandardStandards_CommodityCommodities");
            builder.EntityType<StandardStandards_CommodityCommodities>().HasKey(entity => entity.OID);
            builder.EntityType<StandardStandards_CommodityCommodities>().HasOptional<Commodity>(entity => entity.Commodity, (entity, tergetEntity) => entity.Commodities == tergetEntity.OID);
            builder.EntityType<StandardStandards_CommodityCommodities>().HasOptional<Standard>(entity => entity.Standard, (entity, tergetEntity) => entity.Standards == tergetEntity.OID);

            builder.EntitySet<Supplier>("Suppliers");
            builder.EntityType<Supplier>().HasKey(entity => entity.OID);
            builder.EntityType<Supplier>().HasOptional<Version>(entity => entity.Version1, (entity, tergetEntity) => entity.Version == tergetEntity.OID);

            builder.EntitySet<SupplierSuppliers_CommodityCommodities>("SupplierSuppliers_CommodityCommodities");
            builder.EntityType<SupplierSuppliers_CommodityCommodities>().HasKey(entity => entity.OID);
            builder.EntityType<SupplierSuppliers_CommodityCommodities>().HasOptional<Commodity>(entity => entity.Commodity, (entity, tergetEntity) => entity.Commodities == tergetEntity.OID);
            builder.EntityType<SupplierSuppliers_CommodityCommodities>().HasOptional<Supplier>(entity => entity.Supplier, (entity, tergetEntity) => entity.Suppliers == tergetEntity.OID);

            builder.EntitySet<Unit>("Units");
            builder.EntityType<Unit>().HasKey(entity => entity.Oid);
            builder.EntityType<Unit>().HasOptional<Organisation>(entity => entity.Organisation1, (entity, tergetEntity) => entity.Organisation == tergetEntity.Oid);
            builder.EntityType<Unit>().HasOptional<Organization>(entity => entity.Organization, (entity, tergetEntity) => entity.Oid == tergetEntity.Oid);
            builder.EntityType<Unit>().HasOptional<UnitType>(entity => entity.UnitType1, (entity, tergetEntity) => entity.UnitType == tergetEntity.OID);
            builder.EntityType<Unit>().HasOptional<Person>(entity => entity.Person, (entity, tergetEntity) => entity.ContactPerson == tergetEntity.Oid);

            builder.EntitySet<UnitOfMeasure>("UnitOfMeasures");
            builder.EntityType<UnitOfMeasure>().HasKey(entity => entity.OID);
            builder.EntityType<UnitOfMeasure>().HasOptional<Version>(entity => entity.Version1, (entity, tergetEntity) => entity.Version == tergetEntity.OID);

            builder.EntitySet<Framework>("Framework");
            builder.EntityType<Framework>().HasKey(entity => entity.OID);
            builder.EntityType<Framework>().HasOptional<Version>(entity => entity.Version1, (entity, tergetEntity) => entity.Version == tergetEntity.OID);

            builder.EntitySet<UnitType>("UnitTypes");
            builder.EntityType<UnitType>().HasKey(entity => entity.OID);
            builder.EntityType<UnitType>().HasOptional<Version>(entity => entity.Version1, (entity, tergetEntity) => entity.Version == tergetEntity.OID);

            builder.EntitySet<Version>("Versions");
            builder.EntityType<Version>().HasKey(entity => entity.OID);

            builder.EntitySet<FileData>("FileDatas");
            builder.EntityType<FileData>().HasKey(entity => entity.Oid);

            builder.EntitySet<ImprovementPlanItem>("ImprovementPlanItems");
            builder.EntityType<ImprovementPlanItem>().HasKey(entity => entity.OID);

            builder.EntitySet<AnswerNote>("AnswerNotes");
            builder.EntityType<AnswerNote>().HasKey(entity => entity.OID);
            builder.EntityType<AnswerNote>().HasOptional<Answer>(entity => entity.Answer1, (entity, tergetEntity) => entity.Answer == tergetEntity.OID);

            builder.EntitySet<AnswerNoteAttachment>("AnswerNoteAttachments");
            builder.EntityType<AnswerNoteAttachment>().HasKey(entity => entity.OID);
            builder.EntityType<AnswerNoteAttachment>().HasOptional<AnswerNote>(entity => entity.AnswerNote1, (entity, tergetEntity) => entity.AnswerNote == tergetEntity.OID);
            builder.EntityType<AnswerNoteAttachment>().HasOptional<FileData>(entity => entity.FileData, (entity, tergetEntity) => entity.Attachment == tergetEntity.Oid);

            builder.EntitySet<FrontMenuItem>("FrontMenuItems");
            builder.EntityType<FrontMenuItem>().HasKey(entity => entity.OID);

            builder.EntitySet<FrameworkFrontMenuItem>("FrameworkFrontMenuItems");
            builder.EntityType<FrameworkFrontMenuItem>().HasKey(entity => entity.OID);
            builder.EntityType<FrameworkFrontMenuItem>().HasOptional<FrontMenuItem>(entity => entity.FrontMenuItem1, (entity, tergetEntity) => entity.FrontMenuItem == tergetEntity.OID);
            builder.EntityType<FrameworkFrontMenuItem>().HasOptional<Framework>(entity => entity.Framework1, (entity, tergetEntity) => entity.Framework == tergetEntity.OID);

            builder.EntitySet<PrimaryDataMonthValue>("PrimaryDataMonthValues");
            builder.EntityType<PrimaryDataMonthValue>().HasKey(entity => entity.OID);
            builder.EntityType<PrimaryDataMonthValue>().HasOptional<PrimaryDataValue>(entity => entity.PrimaryDataValue1, (entity, tergetEntity) => entity.PrimaryDataValue == tergetEntity.OID);

            builder.EntitySet<CommodityPDMValue>("CommodityPDMValues");
            builder.EntityType<CommodityPDMValue>().HasKey(entity => entity.OID);
            builder.EntityType<CommodityPDMValue>().HasOptional<Commodity>(entity => entity.Commodity1, (entity, tergetEntity) => entity.Commodity == tergetEntity.OID);
            builder.EntityType<CommodityPDMValue>().HasOptional<PrimaryDataMonthValue>(entity => entity.PrimaryDataMonthValue1, (entity, tergetEntity) => entity.PrimaryDataMonthValue == tergetEntity.OID);

            builder.EntitySet<User>("Users");
            builder.EntityType<User>().HasKey(entity => entity.Oid);
            builder.EntityType<User>().HasOptional<PermissionPolicyUser>(entity => entity.PermissionPolicyUser, (entity, tergetEntity) => entity.Oid == tergetEntity.Oid);
            builder.EntityType<User>().HasOptional<Person>(entity => entity.Person1, (entity, tergetEntity) => entity.Person == tergetEntity.Oid);
            builder.EntityType<User>().Filter("PermissionPolicyUser");
            config.MapODataServiceRoute("odata", "api", builder.GetEdmModel());

            config.Formatters.JsonFormatter.SupportedMediaTypes.Add(new MediaTypeHeaderValue("text/html"));
            GlobalConfiguration.Configuration.Formatters.JsonFormatter.SerializerSettings
    .ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            GlobalConfiguration.Configuration.Formatters
                .Remove(GlobalConfiguration.Configuration.Formatters.XmlFormatter);
            config.Routes.MapHttpRoute(
    name: "DefaultApi",
    routeTemplate: "api/{controller}/{action}/{id}",
    defaults: new { id = RouteParameter.Optional }
);
        }
    }
}