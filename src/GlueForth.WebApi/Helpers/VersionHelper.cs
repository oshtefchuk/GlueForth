using System;

namespace BlueNorth.WebApi.Helpers
{
    public static class VersionHelper
    {
        public static Version CreateVersion(BlueNorthEntities db, Guid createdByGuid)
        {
            var version = new Version
            {
                Created = DateTime.Now,
                CreatedBy = createdByGuid
            };

            db.Versions.Add(version);

            return version;
        }

        public static Version EditVersion(BlueNorthEntities db, Guid modifiedByGuid, Version currentVersion, bool isDeleted = false)
        {
            var version = currentVersion;
            if (version != null)
            {
                version.Modified = DateTime.Now;
                version.ModifiedBy = modifiedByGuid;
                version.Deleted = isDeleted;
            }
            else
            {
                version = CreateVersion(db, modifiedByGuid);
            }
            return version;
        }
    }
}